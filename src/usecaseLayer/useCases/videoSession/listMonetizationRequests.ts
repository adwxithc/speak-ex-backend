
import { IMonetizationRequestStatus } from '../../../domain/monetizationRequest';
import { BadRequestError } from '../../errors';
import { IMonetizationRequestRepository } from '../../interface/repository/IMonetizationRequestRepository';
import { IFileBucket } from '../../interface/services/IFileBucket';


export const listMonetizationRequests = async ({
    page,
    limit,
    status,
    monetizationRequestRepository,
    fileBucket
}: {
    status:string;
    monetizationRequestRepository:IMonetizationRequestRepository
    page: number;
    limit: number;
    fileBucket:IFileBucket
}) => {

    if(!(['pending','accepted','rejected','all'].includes(status))) throw new BadRequestError('invalid status');

    const {requests,totalRequests} = await monetizationRequestRepository.listMonetizationRequests({limit,page,status:status as IMonetizationRequestStatus & 'all'});
    requests.forEach(req=>{
        req.userData.profile=fileBucket.getFileAccessURL(req.userData.profile);
    });

    const lastPage = Math.ceil(totalRequests / limit);

    return {requests,totalRequests,lastPage};
};