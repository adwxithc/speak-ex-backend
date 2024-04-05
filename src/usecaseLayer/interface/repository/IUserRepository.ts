import IUser from '../../../domainLayer/user';

export interface IUserRepository {
    findUserByEmail(email: string): Promise<IUser | null>;
    findUserByUserName(userName:string): Promise<IUser | null>
    createUser(newUser: IUser): Promise<IUser>;
    getAllUser(): Promise<IUser[]>;
    changePassword(password:string, userId:string):Promise<boolean>
}
