import {
  CreateAssistants,
  UpdateAssistants,
  GetAllAssistants,
  GetAssistantsById,
  DeleteAssistants
} from '../controllers/assistants.controllers.js'

const assistantRoutes = (app) => {
  app.post('/api/assistants', CreateAssistants)
  app.get('/api/assistants', GetAllAssistants)
  app.get('/api/assistants/:id', GetAssistantsById)
  app.put('/api/assistants/:id', UpdateAssistants)
  app.delete('/api/assistants/:id', DeleteAssistants)
}

export default assistantRoutes
