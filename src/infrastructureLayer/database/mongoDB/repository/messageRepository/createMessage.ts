import IMessage from '../../../../../domain/message';
import MessageModel from '../../models/MessageModel';


export const createMessage = async(
    newMessage:IMessage,
    messageModel:typeof MessageModel
):Promise<IMessage>=>{
    
   
    const message = await messageModel.create(newMessage);
    
    return await message.save();
};