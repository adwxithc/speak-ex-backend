import { DbId } from '../usecaseLayer/interface/db/dbTypes';

export type IMonetizationRequestStatus='pending'|'accepted'|'rejected';


interface IMonetizationRequest{
    id?:string
    userId:DbId
    status:IMonetizationRequestStatus;
    description:string;
    createdAt?:string;
    updatedAt?:string;
}

export default IMonetizationRequest;