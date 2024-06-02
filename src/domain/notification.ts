
import { DbId } from '../usecaseLayer/interface/db/dbTypes';
interface INotification{
    id?:DbId;
    userId:string;
    title:string;
    message:string;
    read:boolean;
    type:'POST_LIKE',
    relatedEntity:string,
    actionCreator:string,
    createdAt?:string;
    updatedAt?:string;
}

export default INotification;