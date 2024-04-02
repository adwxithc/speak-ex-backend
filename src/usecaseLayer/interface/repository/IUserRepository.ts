import IUser from "../../../domainLayer/user"

export interface IUserRepository {
    findUserByEmail(email: string): Promise<IUser | null>;
    createUser(newUser: IUser): Promise<IUser>;
    getAllUser(role: string): Promise<IUser []>;
}