import { BadRequestError } from '../../errors';
import { ISessionRepository } from '../../interface/repository/ISessionRepository';
import { IUserRepository } from '../../interface/repository/IUserRepository';

export const getSessionData = async ({
    userId,
    sessionRepository,
    userRepository
}: {
    userId:string,
    sessionRepository:ISessionRepository
    userRepository:IUserRepository
}) => {

    const sessionDataPromise =  sessionRepository.getUsersSesstionData({userId});
    const userPromise =  userRepository.findUserById(userId);
    const [sessionData,user]= await Promise.all([sessionDataPromise,userPromise]);
    if(!sessionData) throw new BadRequestError('invalid user');
    
    
    return {...sessionData,isMonetized:user?.isMonetized as boolean};
};