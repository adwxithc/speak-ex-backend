import { IUserRepository } from '../../../interface/repository/IUserRepository';
import { IFileBucket } from '../../../interface/services/IFileBucket';



export const getFollowings = async ({ 
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
   
    const followings= await userRepository.getFollowings({ userName,page,limit});
    followings.users.forEach(user=>user.profile= fileBucket.getFileAccessURL(user.profile));
    return followings;
};
