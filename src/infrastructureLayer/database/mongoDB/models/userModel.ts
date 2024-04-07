import mongoose, { Schema } from 'mongoose';
import IUser from '../../../../domainLayer/user';



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
        userName: {
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
        },
        blocked: {
            type: Boolean,
            default:false,
        },
        focusLanguage: {
            type: String,
        },
        proficientLanguage: {
            type: [String],
        },
        status:{
            type:String,
            enum:['active','freeze']
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

const UserModel = mongoose.model<IUser>('User', userSchema);


export default UserModel;
