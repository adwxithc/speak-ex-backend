
import ILanguage from '../../../domain/language';
import IPost from '../../../domain/post';
import IUser from '../../../domain/user';
import IWallet from '../../../domain/wallet';


export interface IUserDataWithWallet extends Omit<IUser,'password'>{
    proficientLanguageInfo:ILanguage[];
    focusLanguageInfo:ILanguage;
    wallet:IWallet;
    
}

export interface IUserRepository {
    findUserByEmail(email: string): Promise<IUser | null>;
    findUserById(id: string): Promise<Omit<IUser, 'password'> | null>;
    findLearnerWithWallet(id: string): Promise<Omit<IUser & {wallet:IWallet,focusLanguageInfo:ILanguage}, 'password'> | null>;
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
    getFollowers({ userName,page,limit}:{ userName:string,page:number,limit:number}):Promise<{users:{ userName: string; profile: string; firstName:string; lastName:string,focusLanguage:string }[],totalUsers:number}>
    getFollowings({ userName,page,limit}:{ userName:string,page:number,limit:number}):Promise<{users:{ userName: string; profile: string; firstName:string, lastName:string ,focusLanguage:string}[],totalUsers:number}>
    getFollowingPosts({page,limit,userId}:{page:number,limit:number,userId:string}):Promise<{ posts: (IPost &{user:IUser})[], totalPosts:number }>
    getLearners({helperId}:{helperId:string}):Promise<{id:string}[]>
    getUserDataWithWallet({userId}:{userId:string}):Promise<IUserDataWithWallet>
}


