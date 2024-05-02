import mongoose, { Schema } from 'mongoose';

import IMessage from '../../../../domain/message';

const messageSchema = new Schema<IMessage>(
    {
        roomId:{
            type:String,
            required:true,
            ref:'ChatRooms'
        },
        senderId:{
            type:String,
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

const MessageModel = mongoose.model<IMessage>('Message', messageSchema);

export default MessageModel;
