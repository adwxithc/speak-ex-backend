import { Req, Res } from '../infrastructureLayer/types/expressTypes';
import { IChatUseCase } from '../usecaseLayer/interface/usecase/chatUseCase';
import IMessage from '../domain/message';

export class ChatController {
    constructor(private chatUseCase: IChatUseCase) {}

    async createChatRoom(req: Req, res: Res) {
        const { members } = req.body;
        const chatRoom = await this.chatUseCase.createChatRoom({ members });
        res.json({
            success: true,
            message: 'new chat room created',
            data: chatRoom,
        });
    }

    async getChatRooms(req: Req, res: Res) {
        const { userId } = req.params;
        const {key=''} = req.query;
        
        const chatRooms = await this.chatUseCase.getChatRooms({userId,key:String(key)});

        res.json({
            success: true,
            data: chatRooms,
        });
    }

    async createMessage(req: Req, res: Res) {
        const { roomId } = req.params;
        const { senderId, text } = req.body;

        const message = await this.chatUseCase.createMessage({
            roomId,
            senderId,
            text,
        } as IMessage);
        res.json({
            success: true,
            data: message,
        });
    }

    async getMessages(req: Req, res: Res) {
        const { roomId } = req.params;

        const { page = 1, limit = 10 } = req.query || {};
        console.log(page, limit);

        const pageNumber = parseInt(page as string);
        const limitNumber = parseInt(limit as string);

        const messageData = await this.chatUseCase.getMessages({
            roomId,
            page: pageNumber,
            limit: limitNumber,
        });
        const lastPage = Math.ceil(messageData.totalMessages / limitNumber);

        res.json({
            success: true,
            data: { ...messageData, lastPage },
        });
    }


    async setMessageSeen(req: Req, res: Res) {
        const { roomId } = req.params;
        const{senderId}=req.body;
        const updated = await this.chatUseCase.setMessageSeen({
            senderId,
            roomId,
        });

        res.json({
            success: updated
        });
    }
}
