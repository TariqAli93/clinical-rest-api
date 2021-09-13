import express from 'express'
import history from 'connect-history-api-fallback'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import UserRoutes from './routes/users.routes.js'
import SpecialtieRoutes from './routes/specialties.routes.js'
import DoctorRoutes from './routes/doctors.routes.js'
import clinicRoutes from './routes/clinics.routes.js'
import assistantRoutes from './routes/assistants.routes.js'
import patientsRoutes from './routes/patients.routes.js'
import appointmentRoutes from './routes/appointments.routes.js'

const App = express()
dotenv.config()
App.use(cors())
App.use(cookieParser())
App.use(express.json())
App.use(express.urlencoded({ extended: false }))

// routes
UserRoutes(App)
SpecialtieRoutes(App)
DoctorRoutes(App)
clinicRoutes(App)
assistantRoutes(App)
patientsRoutes(App)
appointmentRoutes(App)

App.use(
  history({
    disableDotRule: true,
    verbose: true
  })
)

App.listen(process.env.PORT || 3000, () => {
  console.log(`Server Running on http://localhost:${process.env.PORT || 3000}`)
})
