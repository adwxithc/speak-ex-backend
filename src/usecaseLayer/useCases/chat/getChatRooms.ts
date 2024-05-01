
import { IChatRoomRepository } from '../../interface/repository/IChatRoomRepository';
import { IFileBucket } from '../../interface/services/IFileBucket';



export const getChatRooms = async ({
    chatRoomRepository,
    userId,
    fileBucket
}:{
    chatRoomRepository: IChatRoomRepository,
    userId:string,
    fileBucket:IFileBucket
}) => {
    
    const chatRooms=await chatRoomRepository.getChatRooms(userId);
    chatRooms.forEach(room=>room.user.profile=fileBucket.getFileAccessURL(room.user.profile));

    return chatRooms;
};
