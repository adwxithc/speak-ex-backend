import IMessage from '../../../domain/message';


export interface IMessageRepository {
    createMessage(newMessage:IMessage): Promise<IMessage>
    getMessages({roomId,limit,page}:{roomId:string,limit:number,page:number}):Promise<{messages:IMessage[],totalMessages:number}>;
    setMessageSeen({ roomId,senderId}:{ roomId:string,senderId:string}):Promise<boolean>
}