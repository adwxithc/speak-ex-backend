import { IMonetizationRequestStatus } from '../../../domain/monetizationRequest';
import IUser from '../../../domain/user';
import { BadRequestError } from '../../errors';
import { IMonetizationRequestRepository } from '../../interface/repository/IMonetizationRequestRepository';
import { IUserRepository } from '../../interface/repository/IUserRepository';

export const updateMonetizationStatus = async ({
    userId,
    status,
    userRepository,
    monetizationRequestRepository,
}: {
    userId: string;
    status:IMonetizationRequestStatus
    userRepository: IUserRepository;
    monetizationRequestRepository: IMonetizationRequestRepository;
}) => {


    if(!status || (status!=='accepted' && status!=='rejected')) throw new BadRequestError('invalid status');

    const updateRequestPromise= monetizationRequestRepository.updateMonetizationStatus({userId,status});
    
    const updateUserPromise =  userRepository.updateUser({id:userId.toString(),isMonetized:(status=='accepted'?true:false)});

    const [user] =await  Promise.all([updateUserPromise,updateRequestPromise]);
    return user as IUser;
};
