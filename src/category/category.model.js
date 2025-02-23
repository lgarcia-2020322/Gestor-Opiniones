import { Schema, model } from 'mongoose'

const categorySchema = Schema(
    {  
        name: {
            type: String,
            required: [true, 'Category name is required'],
            unique: true,
            maxLength: [30, `Can't be more than 30 characters`],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            maxLength: [150, `Can't be more than 150 characters`],
        },
    },
    {
        versionKey: false, 
        timestamps: true
    }
)

export default model('Category', categorySchema)
