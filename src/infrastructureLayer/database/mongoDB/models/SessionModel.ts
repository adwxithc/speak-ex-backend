import mongoose, { Schema } from 'mongoose';
import { ISession } from '../../../../domain/session';

const sessionSchema = new Schema<ISession>(
    {
        sessionCode:{
            type:String,
            required:true,
            unique:true
        },
        isMonetized:{
            type:Boolean,
            default:false
        },
        helper:{
            type:mongoose.Schema.ObjectId,
            ref:'User',
            required:true
        },
        learner:{
            type:mongoose.Schema.ObjectId,
            
        },
        startingTime:{
            type:String,
        },
        endingTime:{
            type:String,
        },
        offers:{
            type:[mongoose.Schema.ObjectId]
        },
        rate:{
            type:Number,
            
        },
        rating:{
            type:Number,
            min: 1,
            max: 5
        },
        languageId:{
            type:mongoose.Schema.ObjectId,
            ref:'languages'
        },
        moneyToTheHelper:{
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

const SessionModel = mongoose.model<ISession>('Session', sessionSchema);

export default SessionModel;
