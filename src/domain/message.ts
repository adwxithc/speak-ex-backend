

interface IMessage{
    id?:string;
    roomId:string;
    senderId:string;
    text:string;
    seen?:boolean;
    createdAt:string;
    updatedAt:string
}

export default IMessage;