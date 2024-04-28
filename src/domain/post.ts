import { DbId } from '../usecaseLayer/interface/db/dbTypes';



interface IPost{
    id?:string;
    title:string
    content:string;
    image?:string;
    userId:DbId;
    upvotes?:DbId[];
    comments?:string[];
    createdAt?:string;
    updatedAt?:string;
} 
export default IPost;