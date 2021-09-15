import {
  CreateMedications,
  UpdateMedications,
  DeleteMedications,
  GetMedications,
  GetMedicationsById
} from '../controllers/medications.controllers.js'

const medicationRoutes = (app) => {
  app.post('/api/medications', CreateMedications)
  app.put('/api/medications/:id', UpdateMedications)
  app.delete('/api/medications/:id', DeleteMedications)
  app.get('/api/medications', GetMedications)
  app.get('/api/medications/:id', GetMedicationsById)
}

export default medicationRoutes
