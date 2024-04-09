import AdminModel from '../../../database/mongoDB/models/AdminModel';
import { AdminRepository } from '../../../database/mongoDB/repository/AdminRepository';

import { Encrypt } from '../../../services/hashPassword';
import { JWTToken } from '../../../services/jwt';

import { AdminUseCase } from '../../../../usecaseLayer/useCases/adminUseCase';

import { AdminController } from '../../../../controller/adminAdapter';



const adminRepository = new AdminRepository(AdminModel);
const encryptService = new Encrypt();
const jwtToken = new JWTToken();

const adminUseCase = new AdminUseCase(
    adminRepository,
    encryptService,
    jwtToken,
);

const adminController = new AdminController(adminUseCase);

export { adminController };
