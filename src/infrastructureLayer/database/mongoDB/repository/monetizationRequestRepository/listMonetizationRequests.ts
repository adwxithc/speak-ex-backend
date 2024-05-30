import IMonetizationRequest, {
    IMonetizationRequestStatus,
} from '../../../../../domain/monetizationRequest';
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
    const requestsPromise = monetizationRequestModel
        .find(matchCondition)
        .sort({ updatedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
    const totalRequestsPromise =
        monetizationRequestModel.countDocuments(matchCondition);

    const [requests, totalRequests] = await Promise.all([
        requestsPromise,
        totalRequestsPromise,
    ]);

    return {
        requests: requests as IMonetizationRequest[],
        totalRequests: totalRequests as number,
    };
};
