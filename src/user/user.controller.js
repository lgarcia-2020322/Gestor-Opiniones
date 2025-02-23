import User from './user.model.js'
import argon2 from 'argon2'

// listar todos 
export const getAll = async(req, res)=>{
    try{
        const { limit = 20, skip = 0 } = req.query
        const users = await User.find()
            .skip(skip)
            .limit(limit)
        if(users.length === 0) return res.status(404).send({message: 'Users not found', success: false})
        return res.send(
            {
                success: true,
                message: 'Users found: ', 
                users,
                total: users.length
            }
        )
    }catch(err){
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

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { password, role, status, ...updateData } = req.body

        const user = await User.findByIdAndUpdate(id, updateData, { new: true })

        if (!user) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'User not found'
                }
            )
        }

        return res.send({
            success: true,
            message: 'User updated',
            user
        })
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
// update pass
export const updatePass = async (req, res) => {
    try {
        const { id } = req.params
        const { currentPassword, newPassword } = req.body

        const user = await User.findById(id)
        if (!user) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'User not found'
                }
        )
        }

        // Validar la contraseña
        const validPass = await argon2.verify(user.password, currentPassword)
        if (!validPass) {
            return res.status(400).send(
                {
                    success: false,
                    message: 'Incorrect password'
                }
        )
        }
        user.password = await argon2.hash(newPassword)
        await user.save()
        return res.send(
            {
                success: true,
                message: 'Password updated'
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
