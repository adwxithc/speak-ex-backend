import mongoose, { Schema } from 'mongoose';
import IUser from '../../../../domain/user';




const userSchema = new Schema<IUser>(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        userName: {
            type: String,
            required: true,
            unique:true
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
        coverPic:{
            type:String
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

        followers: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
            default: []  // Initialize as empty array
        },
        following: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
            default: []  // Initialize as empty array
        },
       

        isMonetized:{
            type: Boolean,
            default:false,
        },
        requestedForMonetization:{
            type:Boolean,
            default:false
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
