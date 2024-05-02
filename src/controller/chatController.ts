
import { Req, Res } from '../infrastructureLayer/types/expressTypes';
import { IChatUseCase } from '../usecaseLayer/interface/usecase/chatUseCase';
import IMessage from '../domain/message';



export class ChatController {
    constructor(private chatUseCase: IChatUseCase) {}

    async createChatRoom(req: Req, res: Res) {
        const {members} = req.body;
        const chatRoom = await this.chatUseCase.createChatRoom({members});
        res.json({
            success:true,
            message:'new chat room created',
            data:chatRoom
        });
    }

    async getChatRooms(req:Req, res:Res){
        const {userId} = req.params;
        const chatRooms = await this.chatUseCase.getChatRooms(userId);
   
        
        res.json({
            success:true,
            data:chatRooms
        });
    }

    async createMessage(req:Req, res:Res){
        const {roomId} = req.params;
        const {senderId, text} =req.body;
     
        const message =  await this.chatUseCase.createMessage({roomId,senderId, text} as IMessage);
        res.json({
            success:true,
            data:message
        });
    }

    async getMessages(req:Req, res:Res){
        const {roomId} = req.params;

        const { page = 1, limit = 5} = req.query ;
        
        const pageNumber = parseInt(page as string);
        const limitNumber = parseInt(limit as string);

        
        const messages = await this.chatUseCase.getMessages({roomId,page:pageNumber,limit:limitNumber});
        res.json({
            success:true,
            data:messages
        });

    }

}
 