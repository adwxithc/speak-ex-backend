import IAdmin from '../../domain/admin';
import { IAdminUseCase } from '../interface/usecase/adminUseCase';
import { IAdminRepository } from '../interface/repository/IAdminRepository';

import {
    getDashboardNumerics,
    getMonthlySessionsProfitSummary,
    getPopularPost,
    getPopularPurchasePlans,
    login,
    updateUser,
} from './admin';
import { IHashpassword } from '../interface/services/IHashPassword';
import { IJwt, IToken } from '../interface/services/IJwt.types';

import { IUserRepository } from '../interface/repository/IUserRepository';
import IUser from '../../domain/user';
import { ICoinPurchaseRepository } from '../interface/repository/ICoinPurchaseRepository';
import { ISessionRepository } from '../interface/repository/ISessionRepository';
import { IPostRepository } from '../interface/repository/IPostRepository';
import { IFileBucket } from '../interface/services/IFileBucket';

export class AdminUseCase implements IAdminUseCase {
    private readonly adminRepository: IAdminRepository;
    private readonly coinPurchaseRepository: ICoinPurchaseRepository;
    private readonly userRepository: IUserRepository;
    private readonly sessionRepository: ISessionRepository;
    private readonly postRepository: IPostRepository;
    private readonly bcrypt: IHashpassword;
    private readonly jwtToken: IJwt;
    private readonly fileBucket: IFileBucket;

    constructor({
        adminRepository,
        userRepository,
        bcrypt,
        jwtToken,
        coinPurchaseRepository,
        sessionRepository,
        postRepository,
        fileBucket
    }: {
        adminRepository: IAdminRepository;
        userRepository: IUserRepository;
        bcrypt: IHashpassword;
        jwtToken: IJwt;
        coinPurchaseRepository: ICoinPurchaseRepository;
        sessionRepository: ISessionRepository;
        postRepository: IPostRepository;
        fileBucket: IFileBucket;
    }) {
        this.adminRepository = adminRepository;
        this.userRepository = userRepository;
        this.bcrypt = bcrypt;
        this.jwtToken = jwtToken;
        this.coinPurchaseRepository = coinPurchaseRepository;
        this.sessionRepository = sessionRepository;
        this.postRepository = postRepository;
        this.fileBucket=fileBucket;
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

    async updateUser({
        id,
        blocked,
    }: {
        id: string;
        blocked?: boolean | undefined;
    }): Promise<Omit<IUser, 'password'> | null> {
        return await updateUser(
            {
                id,
                blocked,
            },
            this.userRepository
        );
    }

    async getDashboardNumerics() {
        return await getDashboardNumerics({
            coinPurchaseRepository: this.coinPurchaseRepository,
            sessionRepository: this.sessionRepository,
        });
    }

    async getMonthlySessionsProfitSummary() {
        return await getMonthlySessionsProfitSummary(this.sessionRepository);
    }

    async getPopularPurchasePlans() {
        return await getPopularPurchasePlans({coinPurchaseRepository:this.coinPurchaseRepository,fileBucket:this.fileBucket});
    }
    async getPopularPost() {
        return await getPopularPost({postRepository:this.postRepository,fileBucket:this.fileBucket});
    }
}
