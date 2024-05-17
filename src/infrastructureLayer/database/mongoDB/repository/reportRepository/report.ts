import mongoose from 'mongoose';
import ReportModel from '../../models/ReportModel';

export const report = async ({
    type,
    referenceId,
    reporter,
    reportedUser,
    description,
    reportModel,
}: {
    type: 'sessions' | 'posts';
    referenceId: string;
    reporter: string;
    reportedUser: string;
    description: string;
    reportModel: typeof ReportModel;
}) => {
    const report = await reportModel.create({
        type,
        referenceId: new mongoose.Types.ObjectId(referenceId),
        reporter: new mongoose.Types.ObjectId(reporter),
        reportedUser: new mongoose.Types.ObjectId(reportedUser),
        description,
    });
    return await report.save();
};
