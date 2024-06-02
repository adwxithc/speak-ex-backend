import mongoose, { Schema } from 'mongoose';

import INotification from '../../../../domain/notification';

const notificationSchema = new Schema<INotification>(
    {
        message:{
            type:String,
            required:true
        },
        read:{
            type:Boolean,
            required:true,
            default:false
        },
        title:{
            type:String,
            required:true
        },
        userId:{
            type:String,
            ref:'User',
        },
        actionCreator:{
            type:String,
            ref:'User',
            required:true
        },
        relatedEntity:{
            type:String,
            required:true,
        },
        type:{
            type:String,
            enum:['POST_LIKE']
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

const NotificationModel = mongoose.model<INotification>('Notification', notificationSchema);

export default NotificationModel;
