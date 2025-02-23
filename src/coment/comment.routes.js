import { Router } from 'express'
import {
    createComment,
    updateComment,
    deleteComment
} from './comment.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { commentValidator } from '../../helpers/validators.js'

const api = Router()

api.post(
    '/create',
    [
        validateJwt,
        commentValidator
    ],
    createComment
)

api.put(
    '/update/:id',
    [
        validateJwt,
        commentValidator
    ],
    updateComment
)

api.delete(
    '/delete/:id',
    validateJwt,
    deleteComment
)

export default api
