import mongoose, { Schema } from 'mongoose';

import IMessage from '../../../../domain/message';

const messageSchema = new Schema<IMessage>(
    {
        roomId:{
            type:mongoose.Schema.ObjectId,
            required:true,
            ref:'ChatRooms'
        },
        sender:{
            type:mongoose.Schema.ObjectId,
            required:true,
            ref:'Users',
        },
        text:{
            type:String,
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

const messageModel = mongoose.model<IMessage>('Message', messageSchema);

export default messageModel;
