import mongoose, { Schema } from 'mongoose';
import IMonetizationRequest from '../../../../domain/monetizationRequest';

const monetizationRequestSchema = new Schema<IMonetizationRequest>(
    {
        description:{
            type:String,
            required:true
        },
        status:{
            type:String,
            enum: ['pending','accepted','rejected'],
            default:'pending'
        },
        userId:{
            type:mongoose.Schema.ObjectId,
            required:true
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

const MonetizationRequestModel = mongoose.model<IMonetizationRequest>('MonetizationRequest', monetizationRequestSchema);

export default MonetizationRequestModel;
