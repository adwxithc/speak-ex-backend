import IUser from '../../../domain/user';


export interface IUserRepository {
    findUserByEmail(email: string): Promise<IUser | null>;
    findUserById(id: string): Promise<Omit<IUser, 'password'> | null>;
    findUserByUserName(userName:string): Promise<IUser | null>

    createUser(newUser: IUser): Promise<IUser>;
    getAllUser(): Promise<IUser[]>;
    changePassword(password:string, userId:string):Promise<boolean>
    listUsers({page,limit,key}:{page:number,limit:number,key:string}):Promise<{users: Omit<IUser, 'password'>[];totalUsers: number;}>;
    countUsers():Promise<number>;
    updateUser({id,firstName,lastName,email,blocked, profile}:{id:string,firstName?:string,lastName?:string,email?:string,blocked?:boolean,profile?:string}):Promise<IUser>;
}
