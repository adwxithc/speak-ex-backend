
import { IMessageRepository } from '../../interface/repository/IMessageRepository';




export const setMessageSeen = async ({
    senderId,
    roomId,
    messageRepository,
  
}:{
    senderId:string
    roomId:string,
    messageRepository:IMessageRepository,



}) => {
   
    
    
    return await messageRepository.setMessageSeen({roomId,senderId});
};
