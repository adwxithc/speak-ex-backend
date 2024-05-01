
import { ChatRoomRepository } from '../../../database/mongoDB/repository/chatRoomRepository';
import ChatRoomModel from '../../../database/mongoDB/models/ChatRoom';
import { ChatUseCase } from '../../../../usecaseLayer/useCases/chatUseCase';
import { ChatController } from '../../../../controller/chatController';
import { ValidateDbObjects } from '../../../services/validateDbObjects';
import { FileBucket } from '../../../services/fileBucket';


const chatRoomRepository = new ChatRoomRepository(ChatRoomModel);
const validateDbObjects =  new ValidateDbObjects();
const fileBucket= new FileBucket();

const chatUseCase = new ChatUseCase({
    chatRoomRepository,
    validateDbObjects,
    fileBucket

});

const chatController = new ChatController(chatUseCase);

export { chatController };
