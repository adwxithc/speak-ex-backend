import IChatRoom from '../../../domain/chatRoom';
import { BadRequestError } from '../../errors';
import { IChatRoomRepository } from '../../interface/repository/IChatRoomRepository';
import { IValidateDbObjects } from '../../interface/services/validateDbObjects';


export const createChatRoom = async ({
    newChatRoom,
    chatRoomRepository,
    validateDbObjects
}:{
    newChatRoom: IChatRoom,
    chatRoomRepository: IChatRoomRepository,
    validateDbObjects:IValidateDbObjects
}) => {
    const {members} = newChatRoom;
    if(
        !validateDbObjects.validateId(members[0]?.toString()) 
        || !validateDbObjects.validateId(members[1]?.toString()) 
        ||members[1]==members[0] )
        throw new BadRequestError('invalid members');

    return await chatRoomRepository.createChatRoom(newChatRoom);
};
