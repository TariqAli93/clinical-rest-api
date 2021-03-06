import express from 'express'
import history from 'connect-history-api-fallback'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import SpecialtieRoutes from './routes/specialties.routes.js'
import DoctorRoutes from './routes/doctors.routes.js'
import clinicRoutes from './routes/clinics.routes.js'
import assistantRoutes from './routes/assistants.routes.js'
import patientsRoutes from './routes/patients.routes.js'
import appointmentRoutes from './routes/appointments.routes.js'
import medicationRoutes from './routes/medications.routes.js'
import prescriptionRoutes from './routes/prescriptions.routes.js'
import authenticationRoutes from './routes/authentication.routes.js'

const App = express()
dotenv.config()
App.use(cors())
App.use(cookieParser())
App.use(express.json())
App.use(express.urlencoded({ extended: false }))

// routes
SpecialtieRoutes(App)
DoctorRoutes(App)
clinicRoutes(App)
assistantRoutes(App)
patientsRoutes(App)
appointmentRoutes(App)
medicationRoutes(App)
prescriptionRoutes(App)
authenticationRoutes(App)

App.use(
  history({
    disableDotRule: true,
    verbose: true
  })
)

App.listen(process.env.PORT || 3000, () => {
  console.log(`Server Running on http://localhost:${process.env.PORT || 3000}`)
})
