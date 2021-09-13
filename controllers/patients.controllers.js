import prismaClient from '@prisma/client'
const {
  PrismaClient
} = prismaClient
const prisma = new PrismaClient()

export const CreatePatients = async (req, res) => {
  await prisma.patients
    .create({
      data: {
        patientName: req.body.fullname,
        patientPhone: req.body.phone,
        patientDob: req.body.dob,
        provinceId: req.body.provinceId
      }
    })
    .then((patients) => {
      res.send(patients)
    })
    .catch((err) => {
      if (err.code === 'P2002' && err.meta.target === 'patientPhone_unique') {
        res.status(400).send({
          message: 'patient phone already exists'
        })
      } else {
        res.status(500).send({
          message: err.message
        })
      }
    })
}

export const UpdatePatients = async (req, res) => {
  await prisma.patients
    .update({
      where: {
        id: Number(req.params.id)
      },
      data: {
        patientName: req.body.fullname,
        patientPhone: req.body.phone,
        patientDob: req.body.dob,
        provinceId: req.body.provinceId
      }
    })
    .then((patients) => {
      if (patients.length > 0) {
        res.send(patients)
      } else {
        res.status(404).send({
          message: 'No patients found'
        })
      }
    })
    .catch((err) => {
      if (err.code === 'P2002' && err.meta.target === 'patientPhone_unique') {
        res.status(400).send({
          message: 'patient phone already exists'
        })
      } else if (err.code === 'P2025') {
        res.status(404).send({
          message: 'No patients found'
        })
      } else {
        res.status(500).send({
          message: err.message
        })
      }
    })
}

export const DeletePatients = async (req, res) => {
  await prisma.patients
    .update({
      where: {
        id: Number(req.params.id)
      },
      data: {
        deleted: true
      }
    })
    .then((patients) => {
      res.send({
        message: 'Patient deleted successfully'
      })
    })
    .catch((err) => {
      if (err.code === 'P2002' && err.meta.target === 'patientPhone_unique') {
        res.status(400).send({
          message: 'patient phone already exists'
        })
      } else if (err.code === 'P2025') {
        res.status(404).send({
          message: 'No patients found'
        })
      } else {
        res.status(500).send({
          message: err.message
        })
      }
    })
}

export const GetPatients = async (req, res) => {
  await prisma.patients
    .findMany({
      where: {
        deleted: false
      },
      include: {
        Provinces: true
      }
    })
    .then((patients) => {
      const patient = patients.map((pa) => {
        return {
          id: pa.id,
          fullname: pa.patientName,
          phone: pa.patientPhone,
          dob: pa.patientDob,
          province: {
            province_id: pa.Provinces.id,
            province_name: pa.Provinces.provinceName
          },
          updated_at: pa.updatedAt,
          created_at: pa.createdAt
        }
      })
      res.send(patient)
    })
    .catch((err) => {
      if (err.code === 'P2002' && err.meta.target === 'patientPhone_unique') {
        res.status(400).send({
          message: 'patient phone already exists'
        })
      } else if (err.code === 'P2025') {
        res.status(404).send({
          message: 'No patients found'
        })
      } else {
        res.status(500).send({
          message: err.message
        })
      }
    })
}

export const GetPatientsById = async (req, res) => {
  await prisma.patients
    .findMany({
      where: {
        AND: [{
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
        Provinces: true
      }
    })
    .then((patients) => {
      const patient = patients.map((pa) => {
        return {
          id: pa.id,
          fullname: pa.patientName,
          phone: pa.patientPhone,
          dob: pa.patientDob,
          province: {
            province_id: pa.Provinces.id,
            province_name: pa.Provinces.provinceName
          },
          updated_at: pa.updatedAt,
          created_at: pa.createdAt
        }
      })
      res.send(patient)
    })
    .catch((err) => {
      if (err.code === 'P2002' && err.meta.target === 'patientPhone_unique') {
        res.status(400).send({
          message: 'patient phone already exists'
        })
      } else if (err.code === 'P2025') {
        res.status(404).send({
          message: 'No patients found'
        })
      } else {
        res.status(500).send({
          message: err.message
        })
      }
    })
}
