import IChatRoom from '../../../domain/chatRoom';
import { IChatList } from '../repository/IChatRoomRepository';



export interface IChatUseCase {
 createChatRoom(newChatRoom:IChatRoom):Promise<IChatRoom>
 getChatRooms(userId:string):Promise<IChatList>

}
 