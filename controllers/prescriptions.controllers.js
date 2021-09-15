import prismaClient from '@prisma/client'
const { PrismaClient } = prismaClient
const prisma = new PrismaClient()

export const CreatePrescriptions = async (req, res) => {
  try {
    const request = {}
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
export const UpdatePrescriptions = async (req, res) => {}
export const DeletePrescriptions = async (req, res) => {}
export const GetPrescriptions = async (req, res) => {}
export const GetPrescriptionsById = async (req, res) => {}
