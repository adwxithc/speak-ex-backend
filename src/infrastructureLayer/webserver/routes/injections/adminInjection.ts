import AdminModel from '../../../database/mongoDB/models/AdminModel';
import UserModel from '../../../database/mongoDB/models/userModel';
import { AdminRepository } from '../../../database/mongoDB/repository/AdminRepository';
import { UserRepository } from '../../../database/mongoDB/repository/UserRepository';

import { Encrypt } from '../../../services/hashPassword';
import { JWTToken } from '../../../services/jwt';

import { AdminUseCase } from '../../../../usecaseLayer/useCases/adminUseCase';

import { AdminController } from '../../../../controller/restController/adminController';
import { CoinPurchaseRepository } from '../../../database/mongoDB/repository/coinPurchaseRepository';
import CoinPurchaseModel from '../../../database/mongoDB/models/CoinPurchaseModal';
import { SessionRepository } from '../../../database/mongoDB/repository/sessionRepository';
import SessionModel from '../../../database/mongoDB/models/SessionModel';
import { PostRepository } from '../../../database/mongoDB/repository/postRepository';
import PostModel from '../../../database/mongoDB/models/post';
import { FileBucket } from '../../../services/fileBucket';



const adminRepository = new AdminRepository(AdminModel);
const coinPurchaseRepository= new CoinPurchaseRepository(CoinPurchaseModel);
const userRepository = new UserRepository(UserModel);
const sessionRepository= new SessionRepository(SessionModel);
const postRepository= new PostRepository(PostModel);
const encryptService = new Encrypt();
const jwtToken = new JWTToken();
const fileBucket = new FileBucket();

const adminUseCase = new AdminUseCase({
    adminRepository,
    bcrypt:encryptService,
    jwtToken,
    userRepository,
    coinPurchaseRepository,
    sessionRepository,
    postRepository,
    fileBucket
}
);




const adminController = new AdminController(adminUseCase);

export { adminController };
