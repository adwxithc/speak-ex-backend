

import IChatRoom from '../../domain/chatRoom';
import IMessage from '../../domain/message';
import { IChatList, IChatRoomRepository } from '../interface/repository/IChatRoomRepository';
import { IMessageRepository } from '../interface/repository/IMessageRepository';
import { IFileBucket } from '../interface/services/IFileBucket';
import { IValidateDbObjects } from '../interface/services/validateDbObjects';

import { IChatUseCase } from '../interface/usecase/chatUseCase';
import { createChatRoom, getChatRooms, createMessage, getMessages } from './chat/';




export class ChatUseCase implements IChatUseCase {
    private readonly chatRoomRepository: IChatRoomRepository;
    private readonly validateDbObjects: IValidateDbObjects;
    private readonly fileBucket:IFileBucket;
    private readonly messageRepository: IMessageRepository;

    constructor({chatRoomRepository,validateDbObjects,fileBucket,messageRepository}:{chatRoomRepository: IChatRoomRepository, validateDbObjects: IValidateDbObjects,fileBucket:IFileBucket,messageRepository:IMessageRepository}) {
        this.chatRoomRepository = chatRoomRepository;
        this.validateDbObjects=validateDbObjects;
        this.fileBucket=fileBucket;
        this.messageRepository = messageRepository;
    }

    async createChatRoom(newChatRoom: IChatRoom): Promise<IChatRoom> {
        return await createChatRoom({newChatRoom,chatRoomRepository:this.chatRoomRepository,validateDbObjects:this.validateDbObjects});
    }

    async getChatRooms(userId: string): Promise<IChatList> {
        return await getChatRooms({userId,chatRoomRepository:this.chatRoomRepository,fileBucket:this.fileBucket,validateDbObjects:this.validateDbObjects});
    }

    async createMessage(newMessage: IMessage): Promise<IMessage> {
        return await createMessage({newMessage,messageRepository:this.messageRepository,validateDbObjects:this.validateDbObjects});
    }


    async getMessages({ roomId, page, limit }: { roomId: string; page: number; limit: number; }): Promise<{ messages: IMessage[]; totalMessages: number; }> {
        return await getMessages({roomId,page,limit,messageRepository:this.messageRepository });
    }
}
