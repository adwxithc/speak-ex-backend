import mongoose, { Schema } from 'mongoose';
import IPost from '../../../../domain/post';

const postSchema = new Schema<IPost>(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        likes: {
            type: [mongoose.Schema.ObjectId],
            default: [],
        },
        comments: {
            type: [mongoose.Schema.ObjectId],
            default: [],
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

const PostModel = mongoose.model<IPost>('Post', postSchema);

export default PostModel;
