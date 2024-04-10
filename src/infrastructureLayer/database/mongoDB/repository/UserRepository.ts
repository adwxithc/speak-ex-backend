import UserModel from '../models/userModel';
import IUser from '../../../../domain/user';
import { IUserRepository } from '../../../../usecaseLayer/interface/repository/IUserRepository';

import { findUserByEmail, createUser, findUserByUserName,changePassword, listUsers, countUsers, updateUser, findUserById } from './userRepository/user';
import { getAllUser } from './userRepository/admin';


export class UserRepository implements IUserRepository {
    constructor(private userModels: typeof UserModel) {}

    async findUserByEmail(email: string): Promise<IUser | null> {
        
        
        const userExist = await findUserByEmail(email, this.userModels);
        return userExist;
    }

    async createUser(newUser: IUser): Promise<IUser> {
        return await createUser( newUser, this.userModels);
        
    }

    async getAllUser(): Promise<IUser[]> {
        return await getAllUser();
    }
    async findUserByUserName(userName: string): Promise<IUser | null> {
        return await findUserByUserName(userName,this.userModels);
    }

    async changePassword(password: string, userId: string): Promise<boolean> {
            
        return await changePassword({userId, password},this.userModels);
    }

    async listUsers({ page, limit, key }: { page: number; limit: number; key: string; }): Promise<{users: Omit<IUser, 'password'>[];totalUsers: number;}> {
       
        return await listUsers({ page, limit, key },this.userModels);
    }
    async countUsers(): Promise<number> {
        return await countUsers(this.userModels);
    }

    async updateUser({ id, firstName, lastName, email, blocked }: { id: string; firstName?: string; lastName?: string ; email?: string; blocked?: boolean; }): Promise<IUser> {
        return await updateUser({ id, firstName, lastName, email, blocked },this.userModels);
    }

    async findUserById(id: string): Promise<Omit<IUser, 'password'> | null> {
        return await findUserById(id,this.userModels);
    }
 
}
