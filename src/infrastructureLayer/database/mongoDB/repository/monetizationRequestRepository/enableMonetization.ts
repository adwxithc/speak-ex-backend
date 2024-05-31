import { IMonetizationRequestStatus } from '../../../../../domain/monetizationRequest';
import MonetizationRequestModel from '../../models/monetizationRequest';

export const enableMonetization = async ({
    userId,
    status,
    monetizationRequestModel,
}: {
    userId:string;
    status:IMonetizationRequestStatus
    monetizationRequestModel: typeof MonetizationRequestModel;
}) => {
    await monetizationRequestModel.updateMany({userId},{status:status}) ;

    
    
};
