import { DbId } from '../usecaseLayer/interface/db/dbTypes';

export interface IComment{
    id?:string,
    text:string,
    userId:DbId,
    postId:DbId,
    parentId:null|string
    createdAt?:string,
    updatedAt?:string
}