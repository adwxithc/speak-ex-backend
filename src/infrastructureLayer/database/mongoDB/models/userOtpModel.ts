import mongoose, { Schema } from 'mongoose';
import  IUserOtp  from '../../../../domainLayer/userOtp';


const userOtpSchema = new Schema<IUserOtp>(
    {
        email: {
            type: String,
            required: true,
        },
        otp: {
            type: Number,
            required: true,
        },
        expiresAt: {
            type: Date,
            default: Date.now,
            expires: 2*60,
        }, // Automatically delete document after 120 seconds
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

const UserOtpModel = mongoose.model<IUserOtp>(
    'UserOtp',
    userOtpSchema
);

export default UserOtpModel;
