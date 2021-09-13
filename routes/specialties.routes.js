import { GetSpecialties, GetSpecialtiesById, UpdateSpecialties, DeleteSpecialties, CreateSpecialties } from '../controllers/specialties.controllers.js'
const SpecialtieRoutes = (app) => {
  app.get('/api/specialties', GetSpecialties)
  app.get('/api/specialties/:id', GetSpecialtiesById)
  app.put('/api/specialties/:id', UpdateSpecialties)
  app.delete('/api/specialties/:id', DeleteSpecialties)
  app.post('/api/specialties', CreateSpecialties)
}

export default SpecialtieRoutes
