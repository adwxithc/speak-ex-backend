import IAdmin from '../../domain/admin';
import { IAdminUseCase } from '../interface/usecase/adminUseCase';
import { IAdminRepository } from '../interface/repository/IAdminRepository';

import { login } from './admin';
import { IHashpassword } from '../interface/services/IHashPassword';
import { IJwt, IToken } from '../interface/services/IJwt.types';

export class AdminUseCase implements IAdminUseCase {
    private readonly adminRepository: IAdminRepository;
    private readonly bcrypt: IHashpassword;
    private readonly jwtToken: IJwt;

    constructor(
        adminRepository: IAdminRepository,
        bcrypt: IHashpassword,
        jwtToken: IJwt
    ) {
        this.adminRepository = adminRepository;
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


}
