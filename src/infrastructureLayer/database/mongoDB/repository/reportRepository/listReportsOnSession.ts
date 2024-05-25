import { IReportWithUsers } from '../../../../../usecaseLayer/interface/usecase/videoSessionUseCase';
import ReportModel from '../../models/ReportModel';


export const listReportsOnSession = async (
    { page, limit, reportModel }: { page: number; limit: number,reportModel:typeof ReportModel },
   
) => {
    // const reports = await reportModel.find({type:'sessions'})
    //     .sort({ updatedAt: -1 })
    //     .skip((page - 1) * limit)
    //     .limit(limit);

    const reports = await reportModel.aggregate([
        {
            $match:{
                type:'sessions'
            }
        },
        {
            $sort:{updatedAt: -1}
        },
        {
            $skip: (page - 1) * limit
        },
        {
            $limit: limit
        },
        {
            $lookup: {
                from: 'users',
                localField: 'reporter',
                foreignField: '_id',
                as: 'reporterInfo'
            }
        },
        {
            $unwind: '$reporterInfo'
        },
        {
            $lookup: {
                from: 'users',
                localField: 'reportedUser',
                foreignField: '_id',
                as:'reportedUserInfo'
            }
        },
        {
            $unwind: '$reportedUserInfo'
        },
        {
            $project:{
                id:'$_id',
                _id:0,
                description:1,
                type:1,
                referenceId:1,
                reporter:1,
                reportedUser:1,
                reportedUserInfo:{
                    id:'$reportedUserInfo._id',
                    firstName: '$reportedUserInfo.firstName',
                    lastName: '$reportedUserInfo.lastName',
                    userName: '$reportedUserInfo.userName',
                },
                reporterInfo:{
                    id:'$reporterInfo._id',
                    firstName: '$reporterInfo.firstName',
                    lastName: '$reporterInfo.lastName',
                    userName: '$reporterInfo.userName',
                },
                createdAt:1,
                updatedAt:1
            }
        }
    ]) as IReportWithUsers[];

    
    
       
    const totalReports = await reportModel.countDocuments();
    
    return {reports,totalReports};
};