import { CreateDoctors, GetDoctors, GetDoctorsById, UpdateDoctors, DeleteDoctors } from '../controllers/doctors.controllers.js'

const DoctorRoutes = (app) => {
  app.post('/api/doctors', CreateDoctors)
  app.get('/api/doctors', GetDoctors)
  app.get('/api/doctors/:id', GetDoctorsById)
  app.put('/api/doctors/:id', UpdateDoctors)
  app.delete('/api/doctors/:id', DeleteDoctors)
}

export default DoctorRoutes
