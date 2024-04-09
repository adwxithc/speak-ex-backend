import mongoose, { Schema } from 'mongoose';
import IAdmin from '../../../../domain/admin';



const adminSchema = new Schema<IAdmin>(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

const AdminModel = mongoose.model<IAdmin>('Admin', adminSchema);


export default AdminModel;
