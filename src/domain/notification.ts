
import { DbId } from '../usecaseLayer/interface/db/dbTypes';
interface INotification{
    id?:DbId;
    userId:string;
    title:string;
    message:string;
    read:boolean;
    type:'POST_LIKE'|'POST_COMMENT'|'MONETIZATION_REQUEST',
    relatedEntity:string,
    actionCreator:string,
   
    createdAt?:string;
    updatedAt?:string;
}

export default INotification;