import Category from './category.model.js'
import Post from '../post/post.model.js'
// todas las categorías
export const getAllCategories = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query
        const categories = await Category.find()
            .skip(skip)
            .limit(limit)

        if (categories.length === 0) return res.status(404).send({ message: 'Categories not found', success: false })
        
        return res.send(
            {
                success: true,
                message: 'Categories found',
                categories,
                total: categories.length
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

// Crear nueva categoría (solo el admin puede hacerlo)
export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body
        // Verificar si la categoría uncategori ya existe
        const defaultCategory = await Category.findOne({ name: "uncategory" })
        // la crea
        if (!defaultCategory) {
            await new Category(
                {
                    name: "uncategory",
                    description: "Default category."
                }
        ).save()
    }

        const category = new Category({ name, description })
        await category.save()

        return res.send(
            {
                success: true,
                message: 'Category created successfully',
                category
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


// Actualizar categoría
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true })

        if (!updatedCategory) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Category not found'
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Category updated successfully',
                category: updatedCategory
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

// Eliminar categoría
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params

        // Verificar si la categoría existe
        const category = await Category.findById(id)
        if (!category) {
            return res.status(404).send({
                success: false,
                message: 'Category not found'
            })
        }

        // No permitir eliminar la categoría "uncategory"
        if (category.name.toLowerCase() === "uncategory") {
            return res.status(400).send({
                success: false,
                message: 'Cannot delete the default category | uncategory |'
            })
        }

        // Buscar la categoría "uncategory" o crearla si no existe
        let defaultCategory = await Category.findOne({ name: "uncategory" })
        if (!defaultCategory) {
            defaultCategory = new Category({
                name: "uncategory",
                description: "Default category."
            })
            await defaultCategory.save()
        }

        // Asignar la nueva categoría "uncategory" a los posts que usaban la categoría eliminada
        await Post.updateMany(
            { category: id }, 
            { category: defaultCategory._id }
        )

        // Eliminar la categoría después de actualizar los posts
        await Category.findByIdAndDelete(id)

        return res.send({
            success: true,
            message: 'Category deleted successfully. All related posts were moved to "uncategory".'
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
