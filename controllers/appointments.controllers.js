import prismaClient from '@prisma/client'
const { PrismaClient } = prismaClient
const prisma = new PrismaClient()

export const CreateAppointments = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(500).send({ message: 'Invalid request, missing body' })
  } else {
    try {
      const appointments = await prisma.appointments.create({
        data: {
          dateTime: req.body.dateTime,
          DoctorAppointments: {
            create: {
              doctorId: req.body.doctorId,
              patientId: req.body.patientId
            }
          }
        }
      })

      res.status(200).send(appointments)
    } catch (err) {
      const error =
        err.code === 'P2002' && err.meta.target === 'dateTime_unique'
      console.log(err)
      if (error) {
        res.status(500).send({ message: 'this time already exists' })
        return
      }
      res.status(err.code).send(err.message)
    }
  }
}

export const UpdateAppointments = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(500).send({ message: 'Invalid request, missing body' })
  } else {
    try {
      const UpdateAppointment = await prisma.appointments.update({
        data: {
          dateTime: req.body.dateTime
        }
      })

      res.status(200).send(UpdateAppointment)
    } catch (err) {
      const error =
        err.code === 'P2002' && err.meta.target === 'dateTime_unique'
      console.log(err)
      if (error) {
        res.status(500).send({ message: 'this time already exists' })
        return
      }
      res.status(err.code).send(err.message)
    }
  }
}

export const DeleteAppointments = async (req, res) => {
  try {
    const DeleteAppointment = await prisma.appointments.update({
      where: {
        id: Number(req.params.id)
      },
      data: {
        deleted: true,
        DoctorAppointments: {
          updateMany: {
            where: {
              appointmentId: Number(req.params.id)
            },
            data: {
              AppointmentDeleted: true
            }
          }
        }
      }
    })
    res.status(200).send(DeleteAppointment)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

export const GetAppointments = async (req, res) => {
  try {
    const GetAppointment = await prisma.appointments.findMany({
      where: {
        deleted: false
      },
      include: {
        DoctorAppointments: {
          where: {
            AppointmentDeleted: false
          },
          include: {
            appointment: true,
            doctor: true,
            patients: true
          }
        }
      }
    })

    const result = GetAppointment.map((app) => {
      return {
        id: app.id,
        date: app.date,
        time: app.time,
        doctor: {
          doctor_id: app.DoctorAppointments.map(
            (doc) => doc.doctor.id
          ).toString(),
          doctor_name: app.DoctorAppointments.map(
            (doc) => doc.doctor.doctorFullName
          ).toString()
        },
        patient: {
          patient_id: app.DoctorAppointments.map(
            (patients) => patients.patients.id
          ).toString(),
          patient_name: app.DoctorAppointments.map(
            (patients) => patients.patients.patientName
          ).toString()
        },
        created_at: app.createdAt,
        updated_at: app.updatedAt
      }
    })

    if (result.length > 0) {
      res.status(200).send(result)
    } else {
      res.status(404).send({ message: 'Not appointments found' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message })
  }
}

export const GetAppointmentsById = async (req, res) => {
  try {
    const GetAppointment = await prisma.appointments.findMany({
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
        DoctorAppointments: {
          where: {
            AppointmentDeleted: false
          },
          include: {
            appointment: true,
            doctor: true,
            patients: true
          }
        }
      }
    })

    const result = GetAppointment.map((app) => {
      return {
        id: app.id,
        date: app.date,
        time: app.time,
        doctor: {
          doctor_id: app.DoctorAppointments.map(
            (doc) => doc.doctor.id
          ).toString(),
          doctor_name: app.DoctorAppointments.map(
            (doc) => doc.doctor.doctorFullName
          ).toString()
        },
        patient: {
          patient_id: app.DoctorAppointments.map(
            (patients) => patients.patients.id
          ).toString(),
          patient_name: app.DoctorAppointments.map(
            (patients) => patients.patients.patientName
          ).toString()
        },
        created_at: app.createdAt,
        updated_at: app.updatedAt
      }
    })

    if (result.length > 0) {
      res.status(200).send(result)
    } else {
      res.status(404).send({ message: 'Not appointments found' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message })
  }
}
