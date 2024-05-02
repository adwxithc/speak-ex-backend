
import { IChatRoomRepository } from '../../interface/repository/IChatRoomRepository';
import { IFileBucket } from '../../interface/services/IFileBucket';
import { IValidateDbObjects } from '../../interface/services/validateDbObjects';



export const getChatRooms = async ({
    chatRoomRepository,
    userId,
    fileBucket,
    validateDbObjects
}:{
    chatRoomRepository: IChatRoomRepository,
    userId:string,
    fileBucket:IFileBucket,
    validateDbObjects:IValidateDbObjects
}) => {
    validateDbObjects.validateId(userId);
    const chatRooms=await chatRoomRepository.getChatRooms(userId);
    chatRooms.forEach(room=>room.user.profile=fileBucket.getFileAccessURL(room.user.profile));

    return chatRooms;
};
