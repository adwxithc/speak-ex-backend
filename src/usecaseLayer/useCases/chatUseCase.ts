
import IChatRoom from '../../domain/chatRoom';
import { IChatList, IChatRoomRepository } from '../interface/repository/IChatRoomRepository';
import { IFileBucket } from '../interface/services/IFileBucket';
import { IValidateDbObjects } from '../interface/services/validateDbObjects';

import { IChatUseCase } from '../interface/usecase/chatUseCase';
import { createChatRoom, getChatRooms } from './chat/';




export class ChatUseCase implements IChatUseCase {
    private readonly chatRoomRepository: IChatRoomRepository;
    private readonly validateDbObjects: IValidateDbObjects;
    private readonly fileBucket:IFileBucket;
    // private readonly messageRepository: IMessageRepository;

    constructor({chatRoomRepository,validateDbObjects,fileBucket}:{chatRoomRepository: IChatRoomRepository, validateDbObjects: IValidateDbObjects,fileBucket:IFileBucket}) {
        this.chatRoomRepository = chatRoomRepository;
        this.validateDbObjects=validateDbObjects;
        this.fileBucket=fileBucket;
        // this.messageRepository = messageRepository;
    }

    async createChatRoom(newChatRoom: IChatRoom): Promise<IChatRoom> {
        return await createChatRoom({newChatRoom,chatRoomRepository:this.chatRoomRepository,validateDbObjects:this.validateDbObjects});
    }

    async getChatRooms(userId: string): Promise<IChatList> {
        return await getChatRooms({userId,chatRoomRepository:this.chatRoomRepository,fileBucket:this.fileBucket});
    }
}
