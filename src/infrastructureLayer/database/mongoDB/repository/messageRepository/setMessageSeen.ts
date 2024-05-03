
import MessageModel from '../../models/MessageModel';


export const setMessageSeen = async({
    roomId,
    senderId,
    messageModel
}:{
    roomId:string,
    senderId:string,
    messageModel:typeof MessageModel 
}):Promise<boolean>=>{
    
   
    const updatedData =  await messageModel.updateMany({roomId,senderId,seen:false},{seen:true});
    return updatedData.modifiedCount==updatedData.matchedCount;
};