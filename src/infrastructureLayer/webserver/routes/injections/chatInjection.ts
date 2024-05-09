
import { ChatRoomRepository } from '../../../database/mongoDB/repository/chatRoomRepository';
import ChatRoomModel from '../../../database/mongoDB/models/ChatRoom';
import { ChatUseCase } from '../../../../usecaseLayer/useCases/chatUseCase';
import { ChatController } from '../../../../controller/restController/chatController';
import { ValidateDbObjects } from '../../../services/validateDbObjects';
import { FileBucket } from '../../../services/fileBucket';
import { MessageRepository } from '../../../database/mongoDB/repository/MessageRepository';
import MessageModel from '../../../database/mongoDB/models/MessageModel';


const chatRoomRepository = new ChatRoomRepository(ChatRoomModel);
const messageRepository = new MessageRepository(MessageModel);
const validateDbObjects =  new ValidateDbObjects();
const fileBucket= new FileBucket();

const chatUseCase = new ChatUseCase({
    chatRoomRepository,
    messageRepository,
    validateDbObjects,
    fileBucket

});

const chatController = new ChatController(chatUseCase);

export { chatController };
