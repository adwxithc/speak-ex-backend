import { DbId } from '../usecaseLayer/interface/db/dbTypes';

interface IChatRoom{
    id?:DbId;
    members:DbId[];
    createdAt?:string,
    updatedAt?:string

}

export default IChatRoom;