import { DbId } from '../usecaseLayer/interface/db/dbTypes';

export type IMonetizationRequestStatus='pending'|'accepted'|'rejected';


interface IMonetizationRequest{
    userId:DbId
    status:IMonetizationRequestStatus;
    description:string;
    
}

export default IMonetizationRequest;