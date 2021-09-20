import prismaClient from '@prisma/client'
const { PrismaClient } = prismaClient
const prisma = new PrismaClient()

export const CreateAssistants = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(500).send({ message: 'invalid request, missing body' })
      return
    }
    const assistants = await prisma.assistants.create({
      data: {
        assistantFullName: req.body.fullname,
        assistantName: req.body.username,
        assistantEmail: req.body.email,
        assistantPassword: req.body.password,
        assistantPhone: req.body.phone,
        doctorId: req.body.doctorId,
        provinceId: req.body.provinceId
      }
    })

    res.status(200).send(assistants)
  } catch (err) {
    if (err.code === 'P2002') {
      switch (err.meta.target) {
        case 'assistantName_unique':
          res.status(500).send({ message: 'assistant name already exists' })
          break
        case 'assistantEmail_unique':
          res.status(500).send({ message: 'assistant email already exists' })
          break
        case 'assistantPhone_unique':
          res.status(500).send({ message: 'assistant phone already exists' })
          break
        default:
          res.status(500).send(err.message)
      }
    } else {
      res.status(500).send(err.message)
    }
  }
}
export const UpdateAssistants = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(500).send({ message: 'invalid request, missing body' })
      return
    }

    const assistants = await prisma.assistants.update({
      where: {
        id: Number(req.params.id)
      },
      data: {
        assistantFullName: req.body.fullname,
        assistantName: req.body.username,
        assistantEmail: req.body.email,
        assistantPassword: req.body.password,
        assistantPhone: req.body.phone,
        provinceId: req.body.provinceId
      }
    })

    res.status(200).send(assistants)
  } catch (err) {
    if (err.code === 'P2002') {
      switch (err.meta.target) {
        case 'assistantName_unique':
          res.status(500).send({ message: 'assistant name already exists' })
          break
        case 'assistantEmail_unique':
          res.status(500).send({ message: 'assistant email already exists' })
          break
        case 'assistantPhone_unique':
          res.status(500).send({ message: 'assistant phone already exists' })
          break
        default:
          res.status(500).send(err.message)
      }
    } else {
      res.status(500).send(err.message)
    }
  }
}
export const GetAllAssistants = async (req, res) => {
  try {
    const assistants = await prisma.assistants.findMany({
      where: {
        deleted: false
      },
      include: {
        Provinces: true,
        doctor: true
      }
    })
    if (assistants.length < 1) {
      res.status(404).send({ message: 'no assistants found' })
    } else {
      const assistant = assistants.map(assist => {
        return {
          id: assist.id,
          fullname: assist.assistantFullName,
          username: assist.assistantName,
          email: assist.assistantEmail,
          phone: assist.assistantPhone,
          password: assist.assistantPassword,
          province: {
            province_id: assist.Provinces.id,
            province_name: assist.Provinces.provinceName
          },
          created_at: assist.createdAt,
          deleted: assist.deleted,
          doctor: {
            doctor_id: assist.doctor.id,
            doctor_name: assist.doctor.doctorFullName
          }
        }
      })
      res.send(assistant)
    }
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
}
export const GetAssistantsById = async (req, res) => {
  try {
    const assistants = await prisma.assistants.findMany({
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
      },
      include: {
        Provinces: true,
        doctor: true
      }
    })

    if (assistants.length < 1) {
      res.status(404).send({ message: 'no assistants found' })
    } else {
      const assistant = assistants.map(assist => {
        return {
          id: assist.id,
          fullname: assist.assistantFullName,
          username: assist.assistantName,
          email: assist.assistantEmail,
          phone: assist.assistantPhone,
          password: assist.assistantPassword,
          province: {
            province_id: assist.Provinces.id,
            province_name: assist.Provinces.provinceName
          },
          created_at: assist.createdAt,
          deleted: assist.deleted,
          doctor: {
            doctor_id: assist.doctor.id,
            doctor_name: assist.doctor.doctorFullName
          }
        }
      })
      res.send(assistant)
    }
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
}
export const DeleteAssistants = async (req, res) => {
  try {
    const assistants = await prisma.assistants.update({
      where: {
        id: Number(req.params.id)
      },
      data: {
        deleted: true
      }
    })
    res.send({ message: 'assistants deleted successfully', assistant: assistants })
  } catch (err) {
    console.log(err)
    if (err.code === 'P2025') {
      res.status(404).send({ message: 'No assistants found' })
    }
    res.status(500).send({ message: err.message })
  }
}
