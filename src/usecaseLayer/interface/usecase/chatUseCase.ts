import IChatRoom from '../../../domain/chatRoom';
import IMessage from '../../../domain/message';
import { IChatList } from '../repository/IChatRoomRepository';



export interface IChatUseCase {
 createChatRoom(newChatRoom:IChatRoom):Promise<IChatRoom>
 getChatRooms({userId, key}:{userId:string, key:string}):Promise<IChatList>
 createMessage(newMessage:IMessage):Promise<IMessage>
 getMessages({roomId,page, limit}:{roomId:string,page:number, limit:number}):Promise<{messages:IMessage[],totalMessages:number}>
 setMessageSeen({ roomId,senderId}:{roomId:string,senderId:string}):Promise<boolean>
}
 