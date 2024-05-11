import mongoose, { Schema } from 'mongoose';
import { ISession } from '../../../../domain/session';

const sessionSchema = new Schema<ISession>(
    {
        sessionCode:{
            type:String,
            required:true,

        },
        helper:{
            type:mongoose.Schema.ObjectId,
            required:true
        },
        learner:{
            type:mongoose.Schema.ObjectId,
            
        },
        duaration:{
            type:Number,
            default:0
        },
        startingTime:{
            type:String,
        },
        endingTime:{
            type:String,
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

const SessionModel = mongoose.model<ISession>('Session', sessionSchema);

export default SessionModel;
