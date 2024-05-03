
import { IChatRoomRepository } from '../../interface/repository/IChatRoomRepository';
import { IFileBucket } from '../../interface/services/IFileBucket';
import { IValidateDbObjects } from '../../interface/services/validateDbObjects';



export const getChatRooms = async ({
    chatRoomRepository,
    key,
    userId,
    fileBucket,
    validateDbObjects
}:{
    chatRoomRepository: IChatRoomRepository,
    key:string,
    userId:string,
    fileBucket:IFileBucket,
    validateDbObjects:IValidateDbObjects
}) => {
    validateDbObjects.validateId(userId);
    const chatRooms=await chatRoomRepository.getChatRooms({userId,key});
    chatRooms.forEach(room=>room.user.profile=fileBucket.getFileAccessURL(room.user.profile));

    return chatRooms;
};
