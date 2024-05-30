
import { IMonetizationRequestStatus } from '../../../domain/monetizationRequest';
import { BadRequestError } from '../../errors';
import { IMonetizationRequestRepository } from '../../interface/repository/IMonetizationRequestRepository';


export const listMonetizationRequests = async ({
    page,
    limit,
    status,
    monetizationRequestRepository,
}: {
    status:string;
    monetizationRequestRepository:IMonetizationRequestRepository
    page: number;
    limit: number;
}) => {

    if(!(['pending','accepted','rejected','all'].includes(status))) throw new BadRequestError('invalid status');

    const {requests,totalRequests} = await monetizationRequestRepository.listMonetizationRequests({limit,page,status:status as IMonetizationRequestStatus & 'all'});
    

    const lastPage = Math.ceil(totalRequests / limit);

    return {requests,totalRequests,lastPage};
};