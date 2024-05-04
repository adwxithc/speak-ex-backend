
import { DbId } from '../usecaseLayer/interface/db/dbTypes';
interface IMessage{
    id?:string;
    roomId:DbId;
    senderId:string;
    text:string;
    seen?:boolean;
    createdAt:string;
    updatedAt:string
}

export default IMessage;