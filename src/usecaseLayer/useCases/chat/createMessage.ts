import IMessage from '../../../domain/message';
import { IMessageRepository } from '../../interface/repository/IMessageRepository';
import { IValidateDbObjects } from '../../interface/services/validateDbObjects';



export const createMessage = async ({
    newMessage,
    messageRepository,
    validateDbObjects
}:{
    newMessage: IMessage,
    messageRepository: IMessageRepository,
    validateDbObjects:IValidateDbObjects


}) => {
    validateDbObjects.validateId(newMessage.senderId);
    
    return await messageRepository.createMessage(newMessage);
};
