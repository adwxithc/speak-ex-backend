import IUser from '../../../domain/user';

export interface IUserRepository {
    findUserByEmail(email: string): Promise<IUser | null>;
    findUserByUserName(userName:string): Promise<IUser | null>
    createUser(newUser: IUser): Promise<IUser>;
    getAllUser(): Promise<IUser[]>;
    changePassword(password:string, userId:string):Promise<boolean>
}
