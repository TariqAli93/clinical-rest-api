import {
  DoctorLogin,
  AssistantLogin,
  AdminLogin
} from '../controllers/authentication.controllers.js'

const authenticationRoutes = (app) => {
  app.post('/api/login/admin', AdminLogin)
  app.post('/api/login/doctor', DoctorLogin)
  app.post('/api/login/assistant', AssistantLogin)
}

export default authenticationRoutes
