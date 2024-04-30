import { DbId } from '../usecaseLayer/interface/db/dbTypes';

export interface IComment{
    id?:string,
    text:string,
    userId:DbId,
    postId:DbId,
    replys?:number
    parentId:null|string
    createdAt?:string,
    updatedAt?:string
}