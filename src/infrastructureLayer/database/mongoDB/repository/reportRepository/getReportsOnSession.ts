import mongoose from 'mongoose';
import ReportModel from '../../models/ReportModel';

import { IReportDetailsOnSession } from '../../../../../usecaseLayer/interface/repository/IReportRepository';

export const getReportsOnSession = async ({
    userId,
    reportModel,
}: {
    userId:string
    reportModel: typeof ReportModel;
}) => {
    const reports = await reportModel.aggregate([
        {
            $match:{
                reportedUser:new mongoose.Types.ObjectId(userId),
                type:'sessions'
            }
        },
        { 
            $lookup: { 
                from: 'users', 
                let: { reporterId: '$reporter' }, 
                pipeline: [
                    { 
                        $match: { 
                            $expr: { $eq: ['$_id', '$$reporterId'] }
                        } 
                    },
                    {
                        $project: {
                            _id: 1,
                            userName: 1,
                            firstName:1,
                            lastName:1,
                            profile: 1
                        }
                    }
                ],
                as: 'reporterDetails' 
            } 
        },
        { $unwind: { path: '$reporterDetails', preserveNullAndEmptyArrays: true } }
    ]) as IReportDetailsOnSession[] ;

    return reports;
    
};
