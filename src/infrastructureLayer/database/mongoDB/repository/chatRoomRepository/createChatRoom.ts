import IChatRoom from '../../../../../domain/chatRoom';
import { BadRequestError } from '../../../../../usecaseLayer/errors';
import ChatRoomModel from '../../models/ChatRoom';



export const createChatRoom = async(
    newChatRoom:IChatRoom,
    chatRoomModel:typeof ChatRoomModel
):Promise<IChatRoom>=>{
    const chatRoomAlreadyExist = await chatRoomModel.findOne({members:{$all:newChatRoom.members}});
    if(chatRoomAlreadyExist) throw new BadRequestError('chat room already exist');
    const chatRoom = await chatRoomModel.create(newChatRoom);
    
    return await chatRoom.save();
};