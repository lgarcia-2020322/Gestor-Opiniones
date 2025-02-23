import { Router } from 'express'
import { 
    getAllPosts,
    createPost,
    updatePost,
    deletePost
} from './post.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { createPostValidator, updatePostValidator } from '../../helpers/validators.js'

const api = Router()

api.post(
    '/create', 
    [
        validateJwt,
        createPostValidator
    ],
    createPost
)

api.get('/getAll', getAllPosts)

api.put(
    '/update/:id',
    [
        validateJwt,
        updatePostValidator
    ],
    updatePost
)

api.delete(
    '/delete/:id',
    [
        validateJwt
    ],
    deletePost
)

export default api
