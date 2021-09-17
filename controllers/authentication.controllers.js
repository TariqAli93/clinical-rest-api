import prismaClient from '@prisma/client'
import jwt from 'jsonwebtoken'
const { PrismaClient } = prismaClient
const prisma = new PrismaClient()

export const AdminLogin = async (req, res) => {
  try {
    const admin = await prisma.admin.findMany({
      where: {
        OR: [
          {
            userName: req.body.userName
          },
          {
            email: req.body.email
          },
          {
            phoneNumber: req.body.phone
          }
        ],
        AND: [
          {
            password: req.body.password
          }
        ]
      },
      include: {
        Provinces: true
      }
    })

    if (admin.length < 1) {
      res.status(404).send({ message: 'authentication failed with invalid credentials' })
      return
    }

    const token = jwt.sign({
      id: admin[0].id,
      username: admin[0].userName,
      email: admin[0].email,
      phone: admin[0].phoneNumber,
      password: admin[0].password,
      role: 'Admin',
      province: {
        province_id: admin[0].Provinces.id,
        province_name: admin[0].Provinces.provinceName
      },
      created_at: admin[0].createdAt,
      updated_at: admin[0].updatedAt
    }, process.env.SECRET_KEY,
    {
      expiresIn: '1d'
    })

    res.status(200).send({ token: token })
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

export const DoctorLogin = async (req, res) => {
  try {
    const doctor = await prisma.doctors.findMany({
      where: {
        OR: [
          {
            doctorName: req.body.userName
          },
          {
            doctorEmail: req.body.email
          },
          {
            doctorPhone: req.body.phone
          }
        ],
        AND: [
          {
            doctorPassword: req.body.password
          }
        ]
      },
      include: {
        Certificates: true,
        Provinces: true,
        DoctorAppointments: true,
        assistant: true,
        clinic: true,
        specialty: true,
        DoctorPrescriptions: true
      }
    })

    if (doctor.length < 1) {
      res.status(404).send({ message: 'authentication failed with invalid credentials' })
      return
    }

    const token = jwt.sign({
      id: doctor[0].id,
      username: doctor[0].doctorName,
      email: doctor[0].doctorEmail,
      phone: doctor[0].doctorPhone,
      password: doctor[0].doctorPassword,
      province: {
        province_id: doctor[0].Provinces.id,
        province_name: doctor[0].Provinces.provinceName
      },
      specialty: {
        specialty_id: doctor[0].specialty.id,
        specialty_name: doctor[0].specialty.specialtyName
      },
      certificate: doctor[0].Certificates.map(certificate => {
        return {
          certificate_id: certificate.id,
          certificate_name: certificate.certificateName,
          certificate_date: certificate.certificateDate,
          certificate_number: certificate.certificateName
        }
      }),
      role: 'Doctor',
      created_at: doctor[0].createdAt,
      updated_at: doctor[0].updatedAt
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '1d'
    }
    )

    res.status(200).send({ token: token })
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

export const AssistantLogin = async (req, res) => {
  try {
    const assistants = await prisma.assistants.findMany({
      where: {
        OR: [
          {
            assistantName: req.body.userName
          },
          {
            assistantEmail: req.body.email
          },
          {
            assistantPhone: req.body.phone
          }
        ],
        AND: [
          {
            assistantPassword: req.body.password
          }
        ]
      },
      include: {
        Provinces: true,
        doctor: true
      }
    })

    if (assistants.length < 1) {
      res.status(404).send({ message: 'authentication failed with invalid credentials' })
      return
    }

    const token = jwt.sign({
      id: assistants[0].id,
      username: assistants[0].assistantName,
      email: assistants[0].assistantEmail,
      phone: assistants[0].assistantPhone,
      password: assistants[0].assistantPassword,
      province: {
        province_id: assistants[0].Provinces.id,
        province_name: assistants[0].Provinces.provinceName
      },
      doctor: {
        doctor_id: assistants[0].doctor.id,
        doctor_name: assistants[0].doctor.doctorFullName
      },
      role: 'Assistant',
      created_at: assistants[0].createdAt,
      deleted: assistants[0].deleted
    },
    process.env.SECRET_KEY,
    {
      expiresIn: '1d'
    }
    )

    res.status(200).send({ token })
  } catch (err) {

  }
}
