interface IPost{
    id?:string;
    title:string
    description:string;
    imageName?:string;
    userId:string;
    likes?:string[];
    comments?:string[];
    createdAt?:string;
    updatedAt?:string;
}
export default IPost;