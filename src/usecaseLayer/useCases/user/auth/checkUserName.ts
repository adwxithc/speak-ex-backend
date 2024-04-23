

import { IUserRepository } from '../../../interface/repository/IUserRepository';

export const checkUserName = async ({
    UserRepository,
    userName,
}: {
    UserRepository: IUserRepository;
    userName: string;
}) => {
 
    const foundUser= await UserRepository.findUserByUserName(userName);
    
    return !foundUser;
    
};
