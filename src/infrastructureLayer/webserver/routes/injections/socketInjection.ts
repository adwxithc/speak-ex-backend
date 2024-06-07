import { SocketController } from '../../../../controller/socketController/SocketController';
import { SocketRepository } from '../../../database/mongoDB/repository/SocketRepository';
import { redisClient } from '../../config/redis';

const socketRepository= new SocketRepository(redisClient);


const socketController = new SocketController({socketRepository});

export {socketController};

