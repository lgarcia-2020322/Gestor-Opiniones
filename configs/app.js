'use strict'

import express from 'express'
import morgan from 'morgan'
import authRoutes from '../src/auth/auth.routes.js'
import userRoutes from '../src/user/user.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import postRoutes from '../src/post/post.routes.js'
import commentRoutes from '../src/coment/comment.routes.js'
import { limiter } from '../middlewares/rate.limit.js'

const configs = (app) =>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(limiter)
    app.use(morgan('dev'))
}

const routes = (app)=>{
    app.use(authRoutes)
    app.use('/v1/user', userRoutes)
    app.use('/v1/category', categoryRoutes)
    app.use('/v1/post', postRoutes)
    app.use('/v1/coment', commentRoutes)
}

export const initServer = async()=>{
    const app = express() //Instancia de express
    try{
        configs(app) //Aplicar configuraciones al servidor
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.error('Server init failed', err)
    }
}
