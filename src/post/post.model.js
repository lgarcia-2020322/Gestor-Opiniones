import { Schema, model } from 'mongoose'

const postSchema = Schema(
    {  
        title: {
            type: String,
            required: [true, 'Title is required'],
            maxLength: [100, `Title can't exceed 100 characters`],
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            maxLength: [50, `Category can't exceed 50 characters`],
        },
        content: {
            type: String,
            required: [true, 'Content is required'],
            maxLength: [2000, `Content can't exceed 2000 characters`],
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Author is required'],
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    {
        versionKey: false, 
        timestamps: true
    }
)

export default model('Post', postSchema)
