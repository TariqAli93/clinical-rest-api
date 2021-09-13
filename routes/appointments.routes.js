import {
  CreateAppointments,
  UpdateAppointments,
  DeleteAppointments,
  GetAppointments,
  GetAppointmentsById
} from '../controllers/appointments.controllers.js'

const appointmentRoutes = (app) => {
  app.post('/api/appointments', CreateAppointments)
  app.put('/api/appointments/:id', UpdateAppointments)
  app.delete('/api/appointments/:id', DeleteAppointments)
  app.get('/api/appointments/:id', GetAppointmentsById)
  app.get('/api/appointments', GetAppointments)
}

export default appointmentRoutes
