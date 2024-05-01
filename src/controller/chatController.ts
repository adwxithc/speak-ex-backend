import { Req, Res } from '../infrastructureLayer/types/expressTypes';
import { IChatUseCase } from '../usecaseLayer/interface/usecase/chatUseCase';



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


}
 