import mongoose, { Schema } from 'mongoose';
import ITag from '../../../../domain/Tag';



const tagSchema = new Schema<ITag>(
    {
        name:{
            type:String,
            required:true,
            unique:true
        },
        count:{
            type:Number,
            default:1,
            
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

const TagModel = mongoose.model<ITag>('Tag', tagSchema);

export default TagModel;
