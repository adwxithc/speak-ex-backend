
import { BadRequestError } from '../../../errors';
import { IUserRepository } from '../../../interface/repository/IUserRepository';
import { IFileBucket } from '../../../interface/services/IFileBucket';



export const getUser = async ({
    userName,
    userRepository,
    fileBucket,
}: {
    userName:string,
    userRepository: IUserRepository,
    fileBucket:IFileBucket,
}) => {

    const user= await userRepository.findUserByUserName(userName);
   
    
    if(!user) throw new BadRequestError('invalid user name');

    user.profile=fileBucket.getFileAccessURL(user?.profile || '');

    return user;
};