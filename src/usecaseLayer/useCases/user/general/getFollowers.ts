import { IUserRepository } from '../../../interface/repository/IUserRepository';
import { IFileBucket } from '../../../interface/services/IFileBucket';



export const getFollowers = async ({ 
    userName,
    page,
    limit,
    userRepository,
    fileBucket
}: {
    userName:string,
    page:number,
    limit:number,
    userRepository: IUserRepository;
    fileBucket:IFileBucket
}) => {
   
    const followers= await userRepository.getFollowers({ userName,page,limit});
    followers.users.forEach(user=>user.profile=fileBucket.getFileAccessURL(user.profile));
    return followers;
};
