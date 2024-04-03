import mongoose, { Model, Schema } from "mongoose";
import IUnverifiedUser from "../../../../domainLayer/unverifiedUser"

function arrayLimit(val:string[]) {
    return val.length > 0;
  }

const unverifiedUserSchema = new Schema<IUnverifiedUser>({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email: {
         type: String,
          required: true 
    },
    password:{
        type:String,
        required:true
    },
    focusLanguage:{
        type:String,
        required:true
    },
    proficientLanguage:{
        type:[String],
        required:true,
        validate: [arrayLimit, 'The array must contain at least one element'] 

    },
    otp:{
        type: String,
        required: true 
    },
    expiresAt: {
         type: Date,
        default: Date.now,
         expires: 2*60 
    } // Automatically delete document after 120 seconds

},{
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
          ret.id = ret._id;
          delete ret._id;
          delete ret.__v;
        },
      },
});

const UnverifiedUserModel = mongoose.model<IUnverifiedUser>('UnverifiedUser', unverifiedUserSchema);

export default UnverifiedUserModel;
