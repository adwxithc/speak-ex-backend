import { DbId } from '../usecaseLayer/interface/db/dbTypes';

interface IChatRoom{
    id?:string;
    members:DbId[];
    createdAt?:string,
    updatedAt?:string

}

export default IChatRoom;