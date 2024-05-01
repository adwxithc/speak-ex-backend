import IChatRoom from '../../../../domain/chatRoom';
import { IChatList, IChatRoomRepository } from '../../../../usecaseLayer/interface/repository/IChatRoomRepository';
import ChatRoomModel from '../models/ChatRoom';
import { createChatRoom, getChatRooms } from './chatRoomRepository/';



export class ChatRoomRepository implements IChatRoomRepository {
    constructor(private chatRoomModel: typeof ChatRoomModel) {}



    async createChatRoom(newChatRoom: IChatRoom): Promise<IChatRoom> {
        return await createChatRoom(newChatRoom,this.chatRoomModel);
    }
    async getChatRooms(userId: string): Promise<IChatList> {
        return await getChatRooms(userId,this.chatRoomModel);
    }
  
}
