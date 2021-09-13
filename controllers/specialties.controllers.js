import prismaClient from '@prisma/client'
import isEquivalent from '../middlewares/isEquivalent.js'
const { PrismaClient } = prismaClient
const prisma = new PrismaClient()

// get all specialties
export const GetSpecialties = async (req, res) => {
  await prisma.specialties
    .findMany({
      where: {
        deleted: false
      }
    })
    .then((special) => {
      if (special.length > 0) {
        res.send(special)
      } else {
        res.status(404).send({ message: 'No specialties found' })
      }
    })
    .catch((err) => console.error(err))
}

// get  specialties by id
export const GetSpecialtiesById = async (req, res) => {
  await prisma.specialties
    .findMany({
      where: {
        AND: [
          {
            id: {
              equals: Number(req.params.id)
            }
          },
          {
            deleted: false
          }
        ]
      }
    })
    .then((special) => {
      if (special.length > 0) {
        res.send(special[0])
      } else {
        res.status(404).send({ message: 'No specialties found' })
      }
    })
    .catch((err) => console.error(err))
}

// update specialties
export const UpdateSpecialties = async (req, res) => {
  const oldData = await prisma.specialties
    .findMany({
      where: {
        id: { equals: Number(req.params.id) }
      }
    })
    .then((specialties) => {
      return specialties
    })

  if (!req.body) {
    res.status(500).send({ message: 'invalid request, missing body' })
  } else {
    if (oldData.length > 0) {
      if (isEquivalent(req.body, oldData[0])) {
        return res.status(500).send({ message: 'no data changed' })
      } else {
        await prisma.specialties
          .update({
            where: {
              id: Number(req.params.id)
            },
            data: {
              specialtyName: req.body.specialtyName
            }
          })
          .then((result) => {
            res.send(result)
          })
          .catch((err) => {
            console.log(err)
            res.status(500).send({ message: err.message })
          })
      }
    } else {
      res.status(404).send({ message: 'No specialties found' })
    }
  }
}

export const DeleteSpecialties = async (req, res) => {
  await prisma.specialties
    .update({
      where: {
        id: Number(req.params.id)
      },
      data: {
        deleted: true
      }
    })
    .then((result) => {
      res
        .status(200)
        .send({ message: 'Deleted Specialties', specialties: result })
    })
    .catch((error) => {
      console.log(error)
      if (error.code === 'P2025') {
        res.status(404).send({ message: 'No specialties found' })
      } else {
        res.status(500).send({ message: error.message })
      }
    })
}

export const CreateSpecialties = async (req, res) => {
  await prisma.specialties
    .create({
      data: {
        specialtyName: req.body.specialtyName
      }
    })
    .then((specialties) => {
      res
        .status(200)
        .send({
          message: 'specialties created successfully',
          specialties: specialties
        })
    })
    .catch((err) => {
      console.log(err.message)
      res.status(500).send({ message: err.message })
    })
}
