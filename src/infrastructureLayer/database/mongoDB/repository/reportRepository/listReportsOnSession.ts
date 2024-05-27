import { IReportWithUsers } from '../../../../../usecaseLayer/interface/usecase/videoSessionUseCase';
import ReportModel from '../../models/ReportModel';


export const listReportsOnSession = async (
    { page, limit, reportModel }: { page: number; limit: number,reportModel:typeof ReportModel },
   
) => {
    const reportsPromise =  reportModel.aggregate([
        {
            $group: {
                _id: '$reportedUser',
                reportCount: { $sum: 1 },
                reports: {
                    $push: {
                        reportId: '$_id',
                        description: '$description',
                        type: '$type',
                        referenceId: '$referenceId',
                        reporter: '$reporter',
                        createdAt: '$createdAt'
                    }
                }
            }
        },
        {
            $match: {
                reportCount: { $gt: 5 }
            }
        },
        {
            $sort: {
                reportCount: -1
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
            $unwind: '$reports' 
        },
        {
            $lookup: {
                from: 'users',
                let: { reporterId: '$reports.reporter' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ['$_id', '$$reporterId'] }
                        }
                    },
                    {
                        $project: {
                            
                            id:'$_id',
                            _id: 0,
                            firstName: 1,
                            lastName: 1,
                            userName: 1,
                            profile: 1
                        }
                    }
                ],
                as: 'reports.reporterInfo'
            }
        },
        {
            $unwind: '$reports.reporterInfo' // Unwind the result of $lookup
        },
        {
            $group: {
                _id: '$_id',
                reportCount: { $first: '$reportCount' },
                reports: { $push: '$reports' }
            }
        },
        {
            $lookup: {
                from: 'users',
                let: { userId: '$_id' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ['$_id', '$$userId'] }
                        }
                    },
                    {
                        $project: {
                            id:'$_id',
                            _id: 0,
                            firstName: 1,
                            lastName: 1,
                            userName: 1,
                            profile: 1
                        }
                    }
                ],
                as: 'reportedUserInfo'
            }
        },
        
        {
            $unwind:'$reportedUserInfo'
        }
       
    ]);

    const totalCountQueryResultPromise =  reportModel.aggregate([
        {
            $group: {
                _id: '$reportedUser',
                reportCount: { $sum: 1 }
            }
        },
        {
            $match: {
                reportCount: { $gt: 5 }
            }
        },
        {
            $group: {
                _id: null,
                totalCount: { $sum: 1 }
            }
        }
    ]);

    const [totalCountQueryResult,reports]= await Promise.all([totalCountQueryResultPromise,reportsPromise]) as [{totalCount:number,_id:null}[], IReportWithUsers[]];

    const totalReports = totalCountQueryResult[0] ? totalCountQueryResult[0].totalCount : 0;
    

    
    return {reports,totalReports};
};