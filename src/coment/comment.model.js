import { Schema, model } from 'mongoose'

const commentSchema = Schema(
    {
        content: {
            type: String,
            required: [true, 'Content is required'],
            maxLength: [500, `Can't be overcome 500 characters`]
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Author is required']
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: [true, 'Post is required']
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

export default model('Comment', commentSchema)
