import mongoose, { Schema } from 'mongoose';
import { IReport } from '../../../../domain/report';

const reportSchema = new Schema<IReport>(
    {
        description:{
            type: String,
            required: true
        },
        type:{
            type: String,
            required: true,
            enum: ['sessions', 'posts']
        },
        referenceId:{
            type:mongoose.Schema.ObjectId,
            required:true,
            refPath: 'type'
        },
        reportedUser:{
            type:mongoose.Schema.ObjectId,
            required:true,
            ref:'User'
        },
        reporter:{
            type:mongoose.Schema.ObjectId,
            required:true,
            ref:'User'
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

const ReportModel = mongoose.model<IReport>('Report', reportSchema);

export default ReportModel;
