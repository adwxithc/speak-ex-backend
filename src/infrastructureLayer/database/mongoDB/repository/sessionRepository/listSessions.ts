import mongoose from 'mongoose';
import SessionModel from '../../models/SessionModel';
import { ISessionDetails } from '../../../../../usecaseLayer/interface/usecase/videoSessionUseCase';

export const listSessions = async ({
    userId,
    limit,
    page,
    type,
    sessionModel,
}: {
    userId: string;
    page: number;
    limit: number;
    type: 'all' | 'helping' | 'learning';
    sessionModel: typeof SessionModel;
}) => {
    let matchCriteria = {};

    if (type == 'helping') {
        matchCriteria = {
            helper: new mongoose.Types.ObjectId(userId),
            endingTime: { $exists: true, $ne: null }
        };
    } else if (type == 'learning') {
        matchCriteria = {
            learner: new mongoose.Types.ObjectId(userId),
            endingTime: { $exists: true, $ne: null }
        };
    } else {
        matchCriteria = {
            $or: [
                { helper: new mongoose.Types.ObjectId(userId) },
                { learner: new mongoose.Types.ObjectId(userId) },
            ],
            endingTime: { $exists: true, $ne: null }
        };
    }

    const sessions = await sessionModel.aggregate([
        {
            $match: matchCriteria,
        },
        {
            $sort: { updatedAt: -1 },
        },
        {
            $skip: (page - 1) * limit,
        },
        {
            $limit: limit,
        },
        {
            $lookup: {
                from: 'users',
                localField: 'helper',
                foreignField: '_id',
                as: 'helperData',
            },
        },
        {
            $unwind: '$helperData',
        },
        {
            $lookup: {
                from: 'users',
                localField: 'learner',
                foreignField: '_id',
                as: 'learnerData',
            },
        },
        {
            $unwind: '$learnerData',
        },
        {
            $project: {
                _id:0,
                id:'$_id',
                sessionCode:1,
                isMonetized:1,
                startingTime:1,
                endingTime:1,
                rate:1,
                helperData:{
                    id:'$helperData._id',
                    firstName:'$helperData.firstName',
                    lastName:'$helperData.lastName',
                    userName:'$helperData.userName',
                    profile:'$learnerData.profile'
                },
                learnerData:{
                    id:'$learnerData._id',
                    firstName:'$learnerData.firstName',
                    lastName:'$learnerData.lastName',
                    userName:'$learnerData.userName',
                    profile:'$learnerData.profile'
                }
            }
        }
    ]) as ISessionDetails[];

    const totalSessions = await sessionModel.countDocuments(matchCriteria);

    return {sessions, totalSessions};
};
