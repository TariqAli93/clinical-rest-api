import { GetUsers, GetUserById, UpdateUser, DeleteUser, CreateUser } from '../controllers/users.controllers.js'

const UserRoutes = (app) => {
  app.get('/api/users', GetUsers)
  app.get('/api/users/:id', GetUserById)
  app.put('/api/users/:id', UpdateUser)
  app.delete('/api/users/:id', DeleteUser)
  app.post('/api/users', CreateUser)
}
export default UserRoutes
