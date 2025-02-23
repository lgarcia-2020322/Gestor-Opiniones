import Post from './post.model.js'
import User from '../user/user.model.js'

// Obtener todas las publicaciones
export const getAllPosts = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query
        const posts = await Post.find({ status: true }) // Filtra solo los activos
            .populate('author', 'username email')
            .skip(skip)
            .limit(limit)

        if (posts.length === 0) 
            return res.status(404).send(
            { 
                success: false, message: 'Posts not found' 
            }
        )

        return res.send(
            {
                success: true,
                message: 'Posts found',
                posts,
                total: posts.length
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            { 
                success: false, 
                message: 'General error', 
                err 
            }
        )
    }
}


// Crear una publicación
export const createPost = async (req, res) => {
    try {
        const { title, category, content } = req.body
        const { user } = req

        const post = new Post(
            {
                title,
                category,
                content,
                author: user.uid
            }
        )
        await post.save()

        return res.send({ success: true, message: 'Post created', post })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'General error', err })
    }
}

// Editar una publicación (solo el autor puede hacerlo)
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params
        const { user } = req
        const { title, category, content } = req.body

        const post = await Post.findById(id)
        if (!post) 
            return res.status(404).send({ success: false, message: 'Post not found' })

        if (post.author.toString() !== user.uid.toString()) 
            return res.status(403).send({ success: false, message: 'You can only edit your own posts' })

        post.title = title || post.title
        post.category = category || post.category
        post.content = content || post.content

        await post.save()

        return res.send({ success: true, message: 'Post updated', post })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'General error', err })
    }
}

// Eliminar una publicación (solo el autor o un admin pueden hacerlo)
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params
        const { user } = req

        const post = await Post.findById(id)
        if (!post) 
            return res.status(404).send({ success: false, message: 'Post not found' })

        if (post.author.toString() !== user.uid.toString()) 
            return res.status(403).send({ success: false, message: 'You can only delete your own posts' })

        post.status = false  
        await post.save()

        return res.send({ success: true, message: 'Post disabled' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'General error', err })
    }
}