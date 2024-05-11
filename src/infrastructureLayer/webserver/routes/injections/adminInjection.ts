import AdminModel from '../../../database/mongoDB/models/AdminModel';
import UserModel from '../../../database/mongoDB/models/userModel';
import { AdminRepository } from '../../../database/mongoDB/repository/AdminRepository';
import { UserRepository } from '../../../database/mongoDB/repository/UserRepository';

import { Encrypt } from '../../../services/hashPassword';
import { JWTToken } from '../../../services/jwt';

import { AdminUseCase } from '../../../../usecaseLayer/useCases/adminUseCase';

import { AdminController } from '../../../../controller/restController/adminController';



const adminRepository = new AdminRepository(AdminModel);
const userRepository = new UserRepository(UserModel);
const encryptService = new Encrypt();
const jwtToken = new JWTToken();

const adminUseCase = new AdminUseCase({
    adminRepository,
    bcrypt:encryptService,
    jwtToken,
    userRepository
}
);




const adminController = new AdminController(adminUseCase);

export { adminController };
