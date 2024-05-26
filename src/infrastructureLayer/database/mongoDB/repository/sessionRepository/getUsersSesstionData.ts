
import mongoose from 'mongoose';
import { IUsersSesstionData } from '../../../../../usecaseLayer/interface/repository/ISessionRepository';
import SessionModel from '../../models/SessionModel';


export const getUsersSesstionData = async ({
    userId,
    sessionModel,
}: {
    userId:string,
    sessionModel: typeof SessionModel;
}) => {
    const sessionStats= await sessionModel.aggregate([
        {
            $match: { endingTime: { $exists: true } } 
        },
        {
            $facet: {
                totalHelpingSessions: [
                    { $match: { helper: new mongoose.Types.ObjectId(userId) } },
                    { $count: 'count' }
                ],
                totalLearningSessions: [
                    { $match: { learner: new mongoose.Types.ObjectId(userId) } },
                    { $count: 'count' }
                ],
                helpingSessionsPerMonth: [
                    {
                        $match: { helper: new mongoose.Types.ObjectId(userId) }
                    },
                    {
                        $group: {
                            _id: { $dateToString: { format: '%Y-%m', date: { $toDate: '$createdAt' } } },
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            avgHelpingSessionsPerMonth: { $avg: '$count' }
                        }
                    }
                ],
                learningSessionsPerMonth: [
                    {
                        $match: { learner: new mongoose.Types.ObjectId(userId) }
                    },
                    {
                        $group: {
                            _id: { $dateToString: { format: '%Y-%m', date: { $toDate: '$createdAt' } } },
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            avgLearningSessionsPerMonth: { $avg: '$count' }
                        }
                    }
                ],
                rating: [
                    { $match: { helper:new mongoose.Types.ObjectId( userId), rating: { $exists: true } } },
                    { $group: { _id: null, avgRating: { $avg: '$rating' } } }
                ]
            }
        },
        {
            $project: {
                helpingSessions: { $ifNull: [{ $arrayElemAt: ['$totalHelpingSessions.count', 0] }, 0] },
                learningSessions: { $ifNull: [{ $arrayElemAt: ['$totalLearningSessions.count', 0] }, 0] },
                rating: { $ifNull: [{ $arrayElemAt: ['$rating.avgRating', 0] }, null] },
                avgHelpingSessionsPerMonth: { $ifNull: [{ $arrayElemAt: ['$helpingSessionsPerMonth.avgHelpingSessionsPerMonth', 0] }, 0] },
                avgLearningSessionsPerMonth: { $ifNull: [{ $arrayElemAt: ['$learningSessionsPerMonth.avgLearningSessionsPerMonth', 0] }, 0] }
            }
        }
    ]) as IUsersSesstionData[];

    console.log(sessionStats);
    

   

    return sessionStats[0];
    
};


