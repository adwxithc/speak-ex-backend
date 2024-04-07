import UserModel from '../models/userModel';
import IUser from '../../../../domainLayer/user';
import { IUserRepository } from '../../../../usecaseLayer/interface/repository/IUserRepository';

import { findUserByEmail, createUser, findUserByUserName,changePassword } from './userRepository/user';
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

}
