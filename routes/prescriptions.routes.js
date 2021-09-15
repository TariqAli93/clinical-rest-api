import {
  CreatePrescriptions,
  UpdatePrescriptions,
  DeletePrescriptions,
  GetPrescriptions,
  GetPrescriptionsById
} from '../controllers/prescriptions.controllers.js'
const prescriptionRoutes = (app) => {
  app.post('/api/prescriptions', CreatePrescriptions)
  app.put('/api/prescriptions/:id', UpdatePrescriptions)
  app.delete('/api/prescriptions:id', DeletePrescriptions)
  app.get('/api/prescriptions/:id', GetPrescriptionsById)
  app.get('/api/prescriptions', GetPrescriptions)
}

export default prescriptionRoutes
