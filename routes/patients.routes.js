import {
  CreatePatients,
  UpdatePatients,
  DeletePatients,
  GetPatientsById,
  GetPatients
} from '../controllers/patients.controllers.js'

const patientsRoutes = (app) => {
  app.post('/api/patients', CreatePatients)
  app.put('/api/patients/:id', UpdatePatients)
  app.delete('/api/patients/:id', DeletePatients)
  app.get('/api/patients/:id', GetPatientsById)
  app.get('/api/patients', GetPatients)
}

export default patientsRoutes
