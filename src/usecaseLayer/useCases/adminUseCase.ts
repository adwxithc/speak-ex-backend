import IAdmin from '../../domain/admin';
import { IAdminUseCase } from '../interface/usecase/adminUseCase';
import { IAdminRepository } from '../interface/repository/IAdminRepository';

import { login,updateUser } from './admin';
import { IHashpassword } from '../interface/services/IHashPassword';
import { IJwt, IToken } from '../interface/services/IJwt.types';

import { IUserRepository } from '../interface/repository/IUserRepository';
import IUser from '../../domain/user';

export class AdminUseCase implements IAdminUseCase {
    private readonly adminRepository: IAdminRepository;
    private readonly userRepository: IUserRepository;
    private readonly bcrypt: IHashpassword;
    private readonly jwtToken: IJwt;

    constructor({
        adminRepository,
        userRepository,
        bcrypt,
        jwtToken,
    }: {
        adminRepository: IAdminRepository;
        userRepository: IUserRepository;
        bcrypt: IHashpassword;
        jwtToken: IJwt;
    }) {
        this.adminRepository = adminRepository;
        this.userRepository = userRepository;
        this.bcrypt = bcrypt;
        this.jwtToken = jwtToken;
    }

    //signin
    async signin({
        email,
        password,
    }: {
        email: string;
        password: string;
    }): Promise<{ admin: IAdmin; token: IToken }> {
        return await login({
            bcrypt: this.bcrypt,
            jwtToken: this.jwtToken,
            adminRepository: this.adminRepository,
            email: email,
            password: password,
        });
    }

    

    async updateUser({ id, blocked, }: { id: string; blocked?: boolean | undefined; }): Promise<Omit<IUser, 'password'> | null> {
        return await updateUser(
            {
                id,
                blocked,
            },
            this.userRepository
        );
    }

}
