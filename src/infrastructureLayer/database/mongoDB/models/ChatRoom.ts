import mongoose, { Schema } from 'mongoose';
import IChatRoom from '../../../../domain/chatRoom';

const chatRoomSchema = new Schema<IChatRoom>(
    {
        members: {
            type: [mongoose.Schema.ObjectId],
            required: true,
            ref: 'User',
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

const ChatRoomModel = mongoose.model<IChatRoom>('ChatRoom', chatRoomSchema);

export default ChatRoomModel;
