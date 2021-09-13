import prismaClient from '@prisma/client'
import isEquivalent from '../middlewares/isEquivalent.js'
const { PrismaClient } = prismaClient
const prisma = new PrismaClient()

// get all users
export const GetUsers = async (req, res) => {
  await prisma.users
    .findMany({
      select: {
        id: true,
        uid: true,
        userName: true,
        phoneNumber: true,
        email: true,
        Provinces: true,
        password: true,
        Privilege: {
          select: {
            Role: {
              select: {
                roleName: true,
                id: true
              }
            }
          }
        }
      },
      where: {
        deleted: false
      }
    })
    .then((result) => {
      const users = result.map((user) => {
        return {
          id: user.id,
          uid: user.uid,
          username: user.userName,
          phone: user.phoneNumber,
          email: user.email,
          provinces: user.Provinces.provinceName,
          role_name: user.Privilege.map((role) => role.Role.roleName).join(','),
          role_id: user.Privilege.map((role) => role.Role.id).join(',')
        }
      })
      res.send(users)
    })
    .catch((err) => {
      res.send(err)
      throw err
    })
}

// get userById
export const GetUserById = async (req, res) => {
  await prisma.users
    .findMany({
      where: {
        id: {
          equals: Number(req.params.id)
        }
      },
      select: {
        userName: true,
        phoneNumber: true,
        email: true,
        Provinces: true,
        password: true,
        Privilege: {
          select: {
            Role: {
              select: {
                roleName: true
              }
            }
          }
        }
      }
    })
    .then((result) => {
      if (result.length > 0) {
        const users = result.map((user) => {
          return {
            username: user.userName,
            phone: user.phoneNumber,
            email: user.email,
            provinces: user.Provinces.provinceName,
            role:
              user.Privilege.length < 2
                ? user.Privilege[0].Role.roleName
                : user.Privilege.map((role) => {
                  return role.Role.roleName
                })
          }
        })
        res.send(users)
      } else {
        res.status(404).send({
          message: 'No Users were found'
        })
      }
    })
    .catch((err) => {
      res.status(500).send(err.message)
      throw err
    })
}

// update user
export const UpdateUser = async (req, res) => {
  if (!req.body) {
    res.status(500).send({ message: 'Invalid request, missing body' })
    return
  }

  const oldData = await prisma.users
    .findMany({
      where: {
        id: Number(req.params.id)
      },
      select: {
        userName: true,
        phoneNumber: true,
        email: true,
        password: true,
        provinceId: true
      }
    })
    .then((result) => {
      return result.map((old) => {
        return {
          userName: old.userName,
          phoneNumber: old.phoneNumber,
          email: old.email,
          password: old.password,
          provinceId: old.provinceId
        }
      })
    })

  if (isEquivalent(req.body, oldData[0])) {
    res.status(500).send({ message: 'no data changed' })
  } else {
    await prisma.users
      .update({
        data: {
          userName: req.body.userName,
          phoneNumber: req.body.phoneNumber,
          email: req.body.email,
          password: req.body.password,
          provinceId: req.body.provinceId
        },
        where: {
          id: Number(req.params.id)
        }
      })
      .then((result) => {
        res.send(result)
      })
      .catch((err) => {
        if (err.code === 'P2025') {
          res.status(404).send({ message: 'user not found' })
        } else {
          res.status(500).send(err)
        }
      })
  }
}

// delete users
export const DeleteUser = async (req, res) => {
  await prisma.users
    .update({
      where: { id: Number(req.params.id) },
      data: {
        deleted: true
      }
    })
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      if (err.code === 'P2025') {
        res.status(404).send({ message: 'user not found' })
      } else {
        res.status(500).send(err)
      }
    })
}

// create user
export const CreateUser = async (req, res) => {
  if (!req.body) {
    res.status(500).send({ message: 'Invalid request, missing body' })
  }

  console.log(await req.body)
  await prisma.users.create({
    data: {
      userName: req.body.userName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      password: req.body.password,
      provinceId: req.body.provinceId
    }
  }).then(user => {
    prisma.privilege.create({
      data: {
        roleId: req.body.roleId,
        userId: user.id
      },

      include: {
        Role: true,
        User: true
      }
    }).then(privileges => {
      res.send({ message: 'User created successfully', user: user, privileges: privileges })
    })
  }).catch(err => {
    console.log(err)
    res.status(500).send({ message: err.message })
  })
}
