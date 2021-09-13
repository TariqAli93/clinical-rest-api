import prismaClient from '@prisma/client'
const { PrismaClient } = prismaClient
const prisma = new PrismaClient()

export const CreateClinics = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(500).send({ message: 'Invalid request, missing body' })
  } else {
    await prisma.clinics
      .create({
        data: {
          clinicName: req.body.clinicName,
          clinicPhone: req.body.clinicPhone,
          clinicEmail: req.body.clinicEmail,
          clinicLocation: req.body.clinicLocation,
          clinicDistrict: req.body.clinicDistrict,
          clinicAddress: req.body.clinicAddress,
          provinceId: req.body.provinceId
        }
      })
      .then((clinics) => {
        console.log(clinics)
        res.send(clinics)
      })
      .catch((err) => {
        if (err.code === 'P2002') {
          switch (err.meta.target) {
            case 'clinicName_unique':
              res.status(500).send({ message: 'clinic name already exists' })
              break
            case 'clinicEmail_unique':
              res.status(500).send({ message: 'clinic email already exists' })
              break
            case 'clinicPhone_unique':
              res.status(500).send({ message: 'clinic phone already exists' })
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

export const UpdateClinics = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(500).send({ message: 'Invalid request, missing body' })
  } else {
    await prisma.clinics
      .update({
        where: {
          id: Number(req.params.id)
        },
        data: {
          clinicName: req.body.clinicName,
          clinicPhone: req.body.clinicPhone,
          clinicEmail: req.body.clinicEmail,
          clinicLocation: req.body.clinicLocation,
          clinicDistrict: req.body.clinicDistrict,
          clinicAddress: req.body.clinicAddress,
          provinceId: req.body.provinceId
        }
      })
      .then((clinics) => {
        console.log(clinics)
        res.send(clinics)
      })
      .catch((err) => {
        if (err.code === 'P2002') {
          switch (err.meta.target) {
            case 'clinicName_unique':
              res.status(500).send({ message: 'clinic name already exists' })
              break
            case 'clinicEmail_unique':
              res.status(500).send({ message: 'clinic email already exists' })
              break
            case 'clinicPhone_unique':
              res.status(500).send({ message: 'clinic phone already exists' })
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

export const DeleteClinics = async (req, res) => {
  await prisma.clinics
    .update({
      where: {
        id: Number(req.params.id)
      },
      data: {
        deleted: true,
        Doctors: {
          updateMany: {
            where: {
              deleted: false
            },
            data: {
              deleted: true
            }
          }
        }
      }
    })
    .then(() => {
      console.log('clinic deleted successfully')
      res.send({ message: 'Clinic deleted successfully' })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({ message: err.message })
    })
}

export const GetClinics = async (req, res) => {
  await prisma.clinics
    .findMany({
      where: {
        deleted: false
      },
      include: {
        Provinces: {
          select: {
            id: true,
            provinceName: true
          }
        },
        Doctors: {
          where: {
            deleted: false
          },
          select: {
            doctorFullName: true,
            doctorName: true,
            doctorEmail: true,
            doctorPhone: true,
            Provinces: {
              select: {
                id: true,
                provinceName: true
              }
            },
            Certificates: {
              select: {
                id: true,
                certificateName: true,
                certificateDate: true
              }
            },
            specialty: {
              select: {
                id: true,
                specialtyName: true
              }
            }
          }
        }
      }
    })
    .then((clinic) => {
      const clinics = clinic.map((clin) => {
        return {
          clinic_name: clin.clinicName,
          clinic_phone: clin.clinicPhone,
          clinic_email: clin.clinicEmail,
          clinic_location: clin.clinicLocation,
          clinic_province: {
            clinic_province_id: clin.Provinces.id,
            clinic_province_name: clin.Provinces.provinceName
          },
          clinic_doctors: clin.Doctors.map((doctor) => doctor)
        }
      })

      res.send(clinics)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({ message: 'Error: ' + err.message })
    })
}

export const GetClinicsById = async (req, res) => {
  await prisma.clinics
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
      },
      include: {
        Provinces: {
          select: {
            id: true,
            provinceName: true
          }
        },
        Doctors: {
          where: {
            deleted: false
          },
          select: {
            doctorFullName: true,
            doctorName: true,
            doctorEmail: true,
            doctorPhone: true,
            Provinces: {
              select: {
                id: true,
                provinceName: true
              }
            },
            Certificates: {
              select: {
                id: true,
                certificateName: true,
                certificateDate: true
              }
            },
            specialty: {
              select: {
                id: true,
                specialtyName: true
              }
            }
          }
        }
      }
    })
    .then((clinic) => {
      if (clinic.length > 0) {
        const clinics = clinic.map((clin) => {
          return {
            clinic_name: clin.clinicName,
            clinic_phone: clin.clinicPhone,
            clinic_email: clin.clinicEmail,
            clinic_location: clin.clinicLocation,
            clinic_province: {
              clinic_province_id: clin.Provinces.id,
              clinic_province_name: clin.Provinces.provinceName
            },
            clinic_doctors: clin.Doctors.map((doctor) => doctor)
          }
        })

        res.send(clinics)
      } else {
        res.status(404).send({ message: 'No Clinics found' })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({ message: 'Error: ' + err.message })
    })
}
