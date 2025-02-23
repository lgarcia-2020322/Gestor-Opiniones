import Comment from './comment.model.js'

export const createComment = async (req, res) => {
    try {
        const { content, post } = req.body
        const author = req.user.uid

        const newComment = await Comment.create({ content, author, post })
        return res.send({
            success: true,
            message: 'Comment created',
            comment: newComment
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}

export const updateComment = async (req, res) => {
    try {
        const { id } = req.params
        const { content } = req.body
        const userId = req.user.uid

        const comment = await Comment.findById(id)
        if (!comment) {
            return res.status(404).send({
                success: false,
                message: 'Comment not found'
            })
        }

        // Si el comentario está eliminado (status: false), no se puede actualizar
        if (!comment.status) {
            return res.status(400).send({
                success: false,
                message: 'You cannot update a deleted comment'
            })
        }

        // Solo el autor puede actualizar el comentario
        if (comment.author.toString() !== userId.toString()) {
            return res.status(403).send({
                success: false,
                message: 'You can only edit your own comments'
            })
        }

        comment.content = content
        await comment.save()

        return res.send({
            success: true,
            message: 'Comment updated',
            comment
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user.uid

        const comment = await Comment.findById(id)
        if (!comment) {
            return res.status(404).send({
                success: false,
                message: 'Comment not found'
            })
        }

        // Solo el autor puede eliminar el comentario
        if (comment.author.toString() !== userId.toString()) {
            return res.status(403).send({
                success: false,
                message: 'You can only delete your own comments'
            })
        }

        // Cambiar el status a false en lugar de eliminarlo
        comment.status = false
        await comment.save()

        return res.send({
            success: true,
            message: 'Comment deleted'
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}