import { Router } from 'express'
import { 
    getAllCategories, 
    createCategory, 
    updateCategory, 
    deleteCategory 
} from './category.controller.js'
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'
import { categoryValidator } from '../../helpers/validators.js'

const api = Router()

// Rutas para admin
api.post(
    '/create', 
    [
        validateJwt,
        isAdmin,
        categoryValidator
    ],
    createCategory
)

api.get(
    '/getAll', 
    [
        validateJwt,
        isAdmin
    ],
    getAllCategories
)

api.put(
    '/update/:id',
    [
        validateJwt,
        isAdmin,
        categoryValidator
    ],
    updateCategory
)

api.delete(
    '/delete/:id',
    [
        validateJwt,
        isAdmin
    ],
    deleteCategory
)

export default api
