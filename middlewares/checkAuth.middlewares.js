import jwt from 'jsonwebtoken'

export const checkAdminRole = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const isAdmin = decoded.data[0].role_name.split(' ').includes('ADMIN')
    isAdmin ? next() : res.status(401).send({ message: 'You are not allowed to do this action' })
  } catch (err) {
    return res.status(401).send({ message: 'Authentication failed' })
  }
}

export const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    next()
  } catch (err) {
    return res.status(401).send({ message: 'Authentication failed' })
  }
}
