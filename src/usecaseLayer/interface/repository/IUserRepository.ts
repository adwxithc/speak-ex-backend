import IUser from '../../../domain/user';


export interface IUserRepository {
    findUserByEmail(email: string): Promise<IUser | null>;
    findUserById(id: string): Promise<Omit<IUser, 'password'> | null>;
    findUserByUserName(userName:string): Promise<IUser | null>

    createUser(newUser: IUser): Promise<IUser>;
    getAllUser(): Promise<IUser[]>;
    changePassword(password:string, userId:string):Promise<boolean>
    listUsers({page,limit,key}:{page:number,limit:number,key:string}):Promise<{users: Omit<IUser, 'password'>[];totalUsers: number;}>;
    searchUser({page,limit,key}:{page:number,limit:number,key:string}):Promise<{users: Omit<IUser, 'password'>[];totalUsers: number;}>;
    countUsers():Promise<number>;
    updateUser(user:Required<Pick<IUser, 'id'>> & Partial<Omit<IUser ,'email'>>):Promise<IUser>;
    follow({followerId,followedUserId}:{followerId:string,followedUserId:string}):Promise<void>;
    unfollow({followerId,followedUserId}:{followerId:string,followedUserId:string}):Promise<void>;
}


