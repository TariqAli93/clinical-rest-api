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
  try {
    const doctors = await prisma.doctors.findMany({
      where: {
        deleted: false
      },
      include: {
        Certificates: true,
        Provinces: true,
        specialty: true,
        clinic: true,
        assistant: true
      }
    })

    const doctor = doctors.map(doc => {
      return {
        doc_id: doc.id,
        doc_full_name: doc.doctorFullName,
        doc_name: doc.doctorName,
        doc_phone: doc.doctorPhone,
        doc_email: doc.doctorEmail,
        doc_dob: doc.doctorDob,
        assistant: doc.assistant,
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
    res.status(200).send(doctor)
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err })
  }
}

export const GetDoctorsById = async (req, res) => {
  try {
    const doctors = await prisma.doctors.findMany({
      where: {
        AND: [
          {
            deleted: false
          },
          {
            id: {
              equals: Number(req.params.id)
            }
          }
        ]
      },
      include: {
        Certificates: true,
        Provinces: true,
        specialty: true,
        clinic: true,
        assistant: true
      }
    })

    const doctor = doctors.map(doc => {
      return {
        doc_id: doc.id,
        doc_full_name: doc.doctorFullName,
        doc_name: doc.doctorName,
        doc_phone: doc.doctorPhone,
        doc_email: doc.doctorEmail,
        doc_dob: doc.doctorDob,
        assistant: doc.assistant,
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
    res.status(200).send(doctor)
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err })
  }
}
