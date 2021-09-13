import { CreateClinics, GetClinics, GetClinicsById, DeleteClinics, UpdateClinics } from '../controllers/clinics.controllers.js'

const clinicRoutes = (app) => {
  app.post('/api/clinics', CreateClinics)
  app.get('/api/clinics', GetClinics)
  app.get('/api/clinics/:id', GetClinicsById)
  app.delete('/api/clinics/:id', DeleteClinics)
  app.put('/api/clinics/:id', UpdateClinics)
}

export default clinicRoutes
