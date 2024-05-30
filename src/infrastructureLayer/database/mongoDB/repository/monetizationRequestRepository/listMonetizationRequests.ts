import { IMonetizationRequestStatus } from '../../../../../domain/monetizationRequest';
import { IMonetizationRequestData } from '../../../../../usecaseLayer/interface/usecase/videoSessionUseCase';
import MonetizationRequestModel from '../../models/monetizationRequest';

export const listMonetizationRequests = async ({
    limit,
    page,
    status,
    monetizationRequestModel,
}: {
    limit: number;
    page: number;
    status: IMonetizationRequestStatus | 'all';
    monetizationRequestModel: typeof MonetizationRequestModel;
}) => {
    let matchCondition = {};
    if (status !== 'all') {
        matchCondition = { status };
    }

    const requestsPromise = monetizationRequestModel.aggregate([
        {
            $match: matchCondition,
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
                localField: 'userId',
                foreignField: '_id',
                as: 'userData',
            },
        },
        {
            $unwind: '$userData',
        },
        {
            $project: {
                _id: 0,
                description: 1,
                status: 1,
                id: '$_id',
                createdAt: 1,
                updatedAt: 1,
                userData: {
                    id: '$userData._id',
                    firstName: '$userData.firstName',
                    lastName: '$userData.lastName',
                    userName: '$userData.userName',
                    profile: '$userData.profile',
                },
            },
        },
    ]);

 
    const totalRequestsPromise =
        monetizationRequestModel.countDocuments(matchCondition);

    const [requests, totalRequests] = await Promise.all([
        requestsPromise,
        totalRequestsPromise,
    ]);

    return {
        requests: requests as IMonetizationRequestData[],
        totalRequests: totalRequests as number,
    };
};
