import { DbId } from '../usecaseLayer/interface/db/dbTypes';

export type IMonetizationRequestStatus='pending'|'accepted'|'rejected';


interface IMonetizationRequest{
    userId:DbId
    requestDate:Date;
    responseDate?:Date;
    status:IMonetizationRequestStatus;
    comments?:string;
}

export default IMonetizationRequest;