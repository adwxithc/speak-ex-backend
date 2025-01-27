import IChatRoom from '../../../domain/chatRoom';

export type IChatList=IChatRoom&{user:{userName:string,profile:string}}[]

export interface IChatRoomRepository {
    createChatRoom(newChatRoom:IChatRoom): Promise<IChatRoom>
    getChatRooms({userId, key}:{userId:string, key:string}):Promise<IChatList>
}