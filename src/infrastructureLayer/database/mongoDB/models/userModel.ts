import mongoose, { Schema } from 'mongoose';
import IUser from '../../../../domainLayer/user';

function arrayLimit(val: string[]) {
    return val.length > 0;
}

const userSchema = new Schema<IUser>(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        profile: {
            type: String,
            required: true,
        },
        blocked: {
            type: Boolean,
            required: true,
        },
        focusLanguage: {
            type: String,
            required: true,
        },
        proficientLanguage: {
            type: [String],
            required: true,
            validate: [
                arrayLimit,
                'The array must contain at least one element',
            ],
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

const UserModel = mongoose.model<IUser>('User', userSchema);



export default UserModel;
