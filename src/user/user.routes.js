import { Router } from 'express'
import { 
    getAll,
    updatePass,
    updateUser 
} from './user.controller.js'
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'
import { updatePassValidator, updateUserValidator } from '../../helpers/validators.js'

const api = Router()

api.get(
    '/getAll', 
    [
        validateJwt,
        isAdmin
    ],
    getAll
)   

api.put(
    '/updateProfile/:id',
    [
        updateUserValidator,
        validateJwt
    ],
    updateUser
)

api.put(
    '/updatePassword/:id',
    [
        updatePassValidator,
        validateJwt
    ],
    updatePass
)

export default api