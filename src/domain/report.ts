import { DbId } from '../usecaseLayer/interface/db/dbTypes';

export interface IReport{
    id?:string;
    type:'sessions'|'posts';
    referenceId:DbId;
    description:string;
    reportedUser:DbId;
    reporter:DbId;
    createdAt?:string;
    updatedAt?:string;
}