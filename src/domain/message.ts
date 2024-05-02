

interface IMessage{
    id?:string;
    roomId:string;
    senderId:string;
    text:string;
    createdAt:string;
    updatedAt:string
}

export default IMessage;