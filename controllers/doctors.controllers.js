import prismaClient from '@prisma/client'
const { PrismaClient } = prismaClient
const prisma = new PrismaClient()

// create doctor account
export const CreateDoctors = async (req, res) => {
  const isBodyEmpty = Object.keys(req.body).length === 0
  if (isBodyEmpty) {
    res.status(500).send({ message: 'Invalid request, missing body' })
    return 'Invalid request, missing body'
  } else {
    await prisma.doctors
      .create({
        data: {
          doctorFullName: req.body.fullname,
          doctorName: req.body.username,
          doctorEmail: req.body.email,
          doctorPhone: req.body.phone,
          doctorDob: req.body.dob,
          doctorPassword: req.body.password,
          specialtiesId: Number(req.body.specialtiesId),
          provinceId: Number(req.body.provinceId),
          clinicId: Number(req.body.clinicId),
          Certificates: {
            create: req.body.certificates.map((certificates) => {
              return {
                certificateName: certificates.certificateName,
                certificateDate: certificates.certificateDate,
                certificateNumber: certificates.certificateNumber
              }
            })
          }
        }
      })
      .then((certificates) => {
        console.log(certificates)
        res.status(200).send(certificates)
      })
      .catch((err) => {
        if (err.code === 'P2002') {
          switch (err.meta.target) {
            case 'doctorName_unique':
              res.status(500).send({ message: 'doctor name already exists' })
              break
            case 'doctorEmail_unique':
              res.status(500).send({ message: 'doctor email already exists' })
              break
            case 'doctorPhone_unique':
              res.status(500).send({ message: 'doctor phone already exists' })
              break
            default:
              res.status(500).send(err.message)
          }
        } else {
          res.status(500).send(err.message)
        }
      })
  }
}

export const UpdateDoctors = async (req, res) => {
  await prisma.doctors
    .update({
      data: {
        doctorFullName: req.body.fullname,
        doctorName: req.body.username,
        doctorEmail: req.body.email,
        doctorPhone: req.body.phone,
        doctorDob: req.body.dob,
        doctorPassword: req.body.password,
        specialtiesId: Number(req.body.specialtiesId),
        provinceId: Number(req.body.provinceId),
        clinicId: Number(req.body.clinicId),
        Certificates: {
          create: req.body.certificates.map((certificates) => {
            return {
              certificateName: certificates.certificateName,
              certificateDate: certificates.certificateDate,
              certificateNumber: certificates.certificateNumber
            }
          })
        }
      },
      where: {
        id: Number(req.params.id)
      }
    })
    .then((doctors) => {
      res.send(doctors)
    })
    .catch((err) => {
      if (err.code === 'P2002') {
        switch (err.meta.target) {
          case 'doctorName_unique':
            res.status(500).send({ message: 'doctor name already exists' })
            break
          case 'doctorEmail_unique':
            res.status(500).send({ message: 'doctor email already exists' })
            break
          case 'doctorPhone_unique':
            res.status(500).send({ message: 'doctor phone already exists' })
            break
          default:
            res.status(500).send(err.message)
        }
      } else {
        res.status(500).send(err.message)
      }
    })
}

export const DeleteDoctors = async (req, res) => {
  await prisma.doctors
    .update({
      where: {
        id: Number(req.params.id)
      },
      data: {
        deleted: true
      }
    })
    .then(() => res.send({ message: 'Doctor deleted successfully' }))
    .catch((err) => res.status(500).send({ message: err.message }))
}

export const GetDoctors = async (req, res) => {
  await prisma.doctors
    .findMany({
      include: {
        Certificates: true,
        Provinces: true,
        specialty: true,
        clinic: true,
        assistant: true
      },
      where: {
        deleted: false
      }
    })
    .then((doctor) => {
      const doctors = doctor.map((doc) => {
        let assistant = {}
        if (!doc.assistant.deleted && Object.keys(doc.assistant).length > 0) {
          assistant = doc.assistant
        }
        return {
          doc_id: doc.id,
          doc_full_name: doc.doctorFullName,
          doc_name: doc.doctorName,
          doc_phone: doc.doctorPhone,
          doc_email: doc.doctorEmail,
          doc_dob: doc.doctorDob,
          doc_assistant: {
            doc_assistant_id: assistant.id,
            doc_assistant_name: assistant.assistantFullName
          },
          doc_specialty: {
            doc_specialty_id: doc.specialty.id,
            doc_specialty_name: doc.specialty.specialtyName
          },
          doc_province: {
            doc_province_id: doc.Provinces.id,
            doc_province_name: doc.Provinces.provinceName
          },
          doc_clinic: {
            doc_clinic_id: doc.clinic.id,
            doc_clinic_name: doc.clinic.clinicName,
            doc_clinic_phone: doc.clinic.clinicPhone,
            doc_clinic_email: doc.clinic.clinicEmail,
            doc_clinic_location: doc.clinic.clinicLocation
          },
          doc_certificates: doc.Certificates.map((certificate) => {
            return {
              doc_certificate_id: certificate.id,
              doc_certificate_name: certificate.certificateName,
              doc_certificate_date: certificate.certificateDate
            }
          })
        }
      })

      if (doctor.length < 1) {
        res.status(404).send({ message: 'No Doctors Found' })
        return
      }

      res.send(doctors)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({ message: err })
    })
}

export const GetDoctorsById = async (req, res) => {
  const id = Number(req.params.id)
  await prisma.doctors
    .findMany({
      include: {
        Certificates: true,
        Provinces: true,
        specialty: true,
        clinic: true,
        assistant: true
      },
      where: {
        AND: [
          {
            id: {
              equals: id
            }
          },
          {
            deleted: false
          }
        ]
      }
    })
    .then((doctor) => {
      const doctors = doctor.map((doc) => {
        let assistant = {}
        if (!doc.assistant.deleted && Object.keys(doc.assistant).length > 0) {
          assistant = doc.assistant
        }
        return {
          doc_id: doc.id,
          doc_full_name: doc.doctorFullName,
          doc_name: doc.doctorName,
          doc_phone: doc.doctorPhone,
          doc_email: doc.doctorEmail,
          doc_dob: doc.doctorDob,
          doc_assistant: {
            doc_assistant_id: assistant.id,
            doc_assistant_name: assistant.assistantFullName
          },
          doc_specialty: {
            doc_specialty_id: doc.specialty.id,
            doc_specialty_name: doc.specialty.specialtyName
          },
          doc_province: {
            doc_province_id: doc.Provinces.id,
            doc_province_name: doc.Provinces.provinceName
          },
          doc_clinic: {
            doc_clinic_id: doc.clinic.id,
            doc_clinic_name: doc.clinic.clinicName,
            doc_clinic_phone: doc.clinic.clinicPhone,
            doc_clinic_email: doc.clinic.clinicEmail,
            doc_clinic_location: doc.clinic.clinicLocation
          },
          doc_certificates: doc.Certificates.map((certificate) => {
            return {
              doc_certificate_id: certificate.id,
              doc_certificate_name: certificate.certificateName,
              doc_certificate_date: certificate.certificateDate
            }
          })
        }
      })

      if (doctor.length < 1) {
        res.status(404).send({ message: 'No Doctors Found' })
        return
      }

      res.send(doctors[0])
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({ message: err.message })
    })
}
