import IMessage from '../../../../domain/message';
import { IMessageRepository } from '../../../../usecaseLayer/interface/repository/IMessageRepository';
import MessageModel from '../models/MessageModel';
import { createMessage, getMessages } from './messageRepository/';





export class MessageRepository implements IMessageRepository {
    constructor(private messageModel: typeof MessageModel) {}



    async createMessage(newMessage: IMessage): Promise<IMessage> {
        return await createMessage(newMessage,this.messageModel);
    }

    async getMessages({ roomId, limit, page }: { roomId: string; limit: number; page: number; }): Promise<{ messages: IMessage[]; totalMessages: number; }> {
        return await getMessages({roomId,page,limit, messageModel:this.messageModel});
    }
}
