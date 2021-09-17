import prismaClient from '@prisma/client'
const { PrismaClient } = prismaClient
const prisma = new PrismaClient()

export const CreatePrescriptions = async (req, res) => {
  try {
    const prescriptions = await prisma.prescriptions.create({
      data: {
        diagnosis: req.body.diagnosis,
        symptoms: req.body.symptoms,
        DoctorPrescriptions: {
          create: {
            doctorId: req.body.doctorId
          }
        },
        PatientPrescriptions: {
          create: {
            patientId: req.body.patientId
          }
        },
        PrescriptionMedications: {
          createMany: {
            data: req.body.medicationId.map(med => {
              return {
                medicationId: med
              }
            })
          }
        }

      }
    })

    res.status(200).send(prescriptions)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
export const UpdatePrescriptions = async (req, res) => {
  try {
    const prescriptions = await prisma.prescriptions.update({
      where: {
        id: Number(req.params.id)
      },
      data: {
        diagnosis: req.body.diagnosis,
        symptoms: req.body.symptoms,
        PatientPrescriptions: {
          create: {
            patientId: req.body.patientId
          }
        },
        PrescriptionMedications: {
          deleteMany: {
            prescriptionId: {
              equals: Number(req.params.id)
            }
          },
          createMany: {
            data: req.body.medicationId.map(med => {
              return {
                medicationId: med
              }
            })
          }
        }
      }
    })

    res.status(200).send(prescriptions)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
export const DeletePrescriptions = async (req, res) => {
  try {
    const prescriptions = await prisma.prescriptions.update({
      include: {
        PatientPrescriptions: {
          select: {
            id: true
          },
          where: {
            prescriptionId: { equals: Number(req.params.id) }
          }
        }
      },
      where: {
        id: Number(req.params.id)
      },
      data: {
        deleted: true,
        PatientPrescriptions: {
          updateMany: {
            data: {
              deleted: true
            },
            where: {
              prescriptionId: { equals: Number(req.params.id) }
            }
          }
        },
        DoctorPrescriptions: {
          updateMany: {
            data: {
              deleted: true
            },
            where: {
              prescriptionId: { equals: Number(req.params.id) }
            }
          }
        },
        PrescriptionMedications: {
          updateMany: {
            data: {
              deleted: true
            },
            where: {
              prescriptionId: {
                equals: Number(req.params.id)
              }
            }
          }
        }
      }
    })

    res.status(200).send(prescriptions)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
export const GetPrescriptions = async (req, res) => {
  try {
    const prescriptions = await prisma.prescriptions.findMany({
      where: {
        deleted: false
      },
      include: {
        PatientPrescriptions: {
          include: {
            patients: true
          }
        },
        DoctorPrescriptions: {
          include: {
            Doctors: true
          }
        },
        PrescriptionMedications: {
          include: {
            medications: true
          }
        }
      }
    })

    const prescription = prescriptions.map(pres => {
      return {
        id: pres.id,
        diagnosis: pres.diagnosis,
        symptoms: pres.symptoms,
        patient: {
          id: pres.PatientPrescriptions[0].patients.id,
          patient_name: pres.PatientPrescriptions[0].patients.patientName
        },
        medications: pres.PrescriptionMedications.map(med => {
          return {
            id: med.medications.id,
            medication_name: med.medications.commercialName
          }
        }),
        doctor: {
          id: pres.DoctorPrescriptions[0].Doctors.id,
          doctor_name: pres.DoctorPrescriptions[0].Doctors.doctorFullName
        }
      }
    })

    res.status(200).send(prescription)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
export const GetPrescriptionsById = async (req, res) => {
  try {
    const prescriptions = await prisma.prescriptions.findMany({
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
        PatientPrescriptions: {
          include: {
            patients: true
          }
        },
        DoctorPrescriptions: {
          include: {
            Doctors: true
          }
        },
        PrescriptionMedications: {
          include: {
            medications: true
          }
        }
      }
    })

    const prescription = prescriptions.map(pres => {
      return {
        id: pres.id,
        diagnosis: pres.diagnosis,
        symptoms: pres.symptoms,
        patient: {
          id: pres.PatientPrescriptions[0].patients.id,
          patient_name: pres.PatientPrescriptions[0].patients.patientName
        },
        medications: pres.PrescriptionMedications.map(med => {
          return {
            id: med.medications.id,
            medication_name: med.medications.commercialName
          }
        }),
        doctor: {
          id: pres.DoctorPrescriptions[0].Doctors.id,
          doctor_name: pres.DoctorPrescriptions[0].Doctors.doctorFullName
        }
      }
    })

    res.status(200).send(prescription)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
