import mongoose, { Schema } from 'mongoose';
import { IComment } from '../../../../domain/comment';

const commentSchema = new Schema<IComment>(
    {
        text:{
            type:String,
            required:true
        },
        parentId:{
            type:mongoose.Schema.Types.ObjectId || null,
            default:null,
            ref:'Comment'
        },
        postId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Post'
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User'
        },
        replys:{
            type:Number,
            default:0
        }

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

const CommentModel = mongoose.model<IComment>('Comment', commentSchema);

export default CommentModel;
