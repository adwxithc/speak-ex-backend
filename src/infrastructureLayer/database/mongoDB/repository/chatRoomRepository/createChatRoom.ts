import IChatRoom from '../../../../../domain/chatRoom';
import ChatRoomModel from '../../models/ChatRoom';



export const createChatRoom = async(
    newChatRoom:IChatRoom,
    chatRoomModel:typeof ChatRoomModel
):Promise<IChatRoom>=>{
    const chatRoomAlreadyExist = await chatRoomModel.findOne({ members: { $all: newChatRoom.members } });
    if (chatRoomAlreadyExist) {
        return chatRoomAlreadyExist;
    }
    const chatRoom = new chatRoomModel(newChatRoom);
    return await chatRoom.save();
};