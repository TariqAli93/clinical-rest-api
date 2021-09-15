import prismaClient from '@prisma/client'
const { PrismaClient } = prismaClient
const prisma = new PrismaClient()

export const CreateMedications = async (req, res) => {
  try {
    const medications = await prisma.medications.create({
      data: {
        commercialName: req.body.commercialName,
        scientificName: req.body.scientificName
      }
    })

    res.status(200).send(medications)
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message })
  }
}
export const UpdateMedications = async (req, res) => {
  try {
    const medications = await prisma.medications.update({
      where: {
        id: Number(req.params.id)
      },
      data: {
        commercialName: req.body.commercialName,
        scientificName: req.body.scientificName
      }
    })

    res.status(200).send(medications)
  } catch (err) {
    console.log(err)
    if (err.code === 'P2025') {
      res.status(404).send({ message: 'Medication not found' })
      return
    }
    res.status(500).send({ message: err.message })
  }
}
export const DeleteMedications = async (req, res) => {
  try {
    const medications = await prisma.medications.delete({
      where: { id: Number(req.params.id) }
    })

    res.status(200).send(medications)
  } catch (err) {
    console.log(err)
    if (err.code === 'P2025') {
      res.status(404).send({ message: 'Medication not found' })
      return
    }
    res.status(500).send({ message: err.message })
  }
}
export const GetMedications = async (req, res) => {
  try {
    const medications = await prisma.medications.findMany()
    res.status(200).send(medications)
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message })
  }
}
export const GetMedicationsById = async (req, res) => {
  try {
    const medications = await prisma.medications.findMany({
      where: { id: Number(req.params.id) }
    })
    res.status(200).send(medications)
  } catch (err) {
    res.status(500).send({ message: err.message })
    res.status(500).send({ message: err.message })
  }
}
