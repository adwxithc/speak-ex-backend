import { DbId } from '../usecaseLayer/interface/db/dbTypes';

interface IMessage{
    id?:string;
    roomId:DbId;
    sender:DbId;
    text:string;
    createdAt:string;
    updatedAt:string
}

export default IMessage;