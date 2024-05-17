
import { BadRequestError } from '../../../errors';
import { IUserRepository } from '../../../interface/repository/IUserRepository';
import { IFileBucket } from '../../../interface/services/IFileBucket';



export const getUserById = async ({
    userId,
    userRepository,
    fileBucket,
}: {
    userId:string,
    userRepository: IUserRepository,
    fileBucket:IFileBucket,
}) => {

    const user= await userRepository.findUserById(userId);
   
    
    if(!user) throw new BadRequestError('invalid user id');

    user.profile=fileBucket.getFileAccessURL(user?.profile || '');

    return user;
};