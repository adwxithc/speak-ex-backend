import UserModel from '../models/userModel';
import IUser from '../../../../domain/user';
import { IUserRepository } from '../../../../usecaseLayer/interface/repository/IUserRepository';

import {
    findUserByEmail,
    createUser,
    findUserByUserName,
    changePassword,
    listUsers,
    countUsers,
    updateUser,
    searchUser,
    follow,
    unfollow,
    getFollowings,
    getFollowers,
    getFollowingPosts,
    getLearners,
    findLearnerWithWallet,
    findUserById
} from './userRepository/user';
import { getAllUser } from './userRepository/admin';

export class UserRepository implements IUserRepository {
    constructor(private userModels: typeof UserModel) {}

    async findUserByEmail(email: string): Promise<IUser | null> {
        const userExist = await findUserByEmail(email, this.userModels);
        return userExist;
    }

    async createUser(newUser: IUser): Promise<IUser> {
        return await createUser(newUser, this.userModels);
    }

    async getAllUser(): Promise<IUser[]> {
        return await getAllUser();
    }
    async findUserByUserName(userName: string): Promise<IUser | null> {
        return await findUserByUserName(userName, this.userModels);
    }

    async changePassword(password: string, userId: string): Promise<boolean> {
        return await changePassword({ userId, password }, this.userModels);
    }

    async listUsers({
        page,
        limit,
        key,
    }: {
        page: number;
        limit: number;
        key: string;
    }): Promise<{ users: Omit<IUser, 'password'>[]; totalUsers: number }> {
        return await listUsers({ page, limit, key }, this.userModels);
    }

    async searchUser({
        page,
        limit,
        key,
    }: {
        page: number;
        limit: number;
        key: string;
    }): Promise<{ users: Omit<IUser, 'password'>[]; totalUsers: number }> {
        return await searchUser({ page, limit, key }, this.userModels);
    }

    async countUsers(): Promise<number> {
        return await countUsers(this.userModels);
    }

    async updateUser({
        id,
        firstName,
        lastName,
        userName,
        blocked,
        profile,
        proficientLanguage,
        focusLanguage,
    }: Required<Pick<IUser, 'id'>> &
        Partial<Omit<IUser, 'email'>>): Promise<IUser> {
        return await updateUser(
            {
                id,
                firstName,
                lastName,
                userName,
                blocked,
                profile,
                proficientLanguage,
                focusLanguage,
            },
            this.userModels
        );
    }

    async findUserById(id: string) {
        return await findUserById(id, this.userModels);
        
    }
    
    async findLearnerWithWallet(id: string){
        return await findLearnerWithWallet(id, this.userModels);
    }

    async follow({
        followerId,
        followedUserId,
    }: {
        followerId: string;
        followedUserId: string;
    }): Promise<void> {
        return await follow({
            followerId,
            followedUserId,
            userModel: this.userModels,
        });
    }
    async unfollow({
        followerId,
        followedUserId,
    }: {
        followerId: string;
        followedUserId: string;
    }): Promise<void> {
        return await unfollow({
            followerId,
            followedUserId,
            userModel: this.userModels,
        });
    }

    async getFollowers({
        userName,
        page,
        limit,
    }: {
        userName: string;
        page: number;
        limit: number;
    }) {
        return await getFollowers({
            userName,
            page,
            limit,
            userModel: this.userModels,
        });
    }

    async getFollowings({
        userName,
        page,
        limit,
    }: {
        userName: string;
        page: number;
        limit: number;
    }) {
        return await getFollowings({
            userName,
            page,
            limit,
            userModel: this.userModels,
        });
    }

    async getFollowingPosts({
        page,
        limit,
        userId,
    }: {
        page: number;
        limit: number;
        userId: string;
    }) {
        return await getFollowingPosts({
            page,
            limit,
            userId,
            userModel: this.userModels,
        });
    }
    async getLearners({ helperId }: { helperId: string; }) {
        return await getLearners({helperId, userModel:this.userModels});
    }
}
