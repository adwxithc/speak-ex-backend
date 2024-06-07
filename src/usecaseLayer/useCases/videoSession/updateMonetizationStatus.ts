import { IMonetizationRequestStatus } from '../../../domain/monetizationRequest';
import IUser from '../../../domain/user';
import { BadRequestError } from '../../errors';
import { IMonetizationRequestRepository } from '../../interface/repository/IMonetizationRequestRepository';
import { INotificationRepository } from '../../interface/repository/INotification';
import { ISocketRepository } from '../../interface/repository/ISocketRepository';
import { IUserRepository } from '../../interface/repository/IUserRepository';
import { ISocketService } from '../../interface/services/ISocketService';

export const updateMonetizationStatus = async ({
    userId,
    status,
    userRepository,
    monetizationRequestRepository,
    socketService,
    socketRepository,
    notificationRepository
}: {
    userId: string;
    status:IMonetizationRequestStatus
    userRepository: IUserRepository;
    monetizationRequestRepository: IMonetizationRequestRepository;
    socketService:ISocketService;
    socketRepository:ISocketRepository;
    notificationRepository:INotificationRepository
}) => {


    if(!status || (status!=='accepted' && status!=='rejected')) throw new BadRequestError('invalid status');

    const updateRequestPromise= monetizationRequestRepository.updateMonetizationStatus({userId,status});
    
    const updateUserPromise =  userRepository.updateUser({id:userId.toString(),isMonetized:(status=='accepted'?true:false)});

    const message = `your monetization request has been "${status}" by the admin`;


    const notificationPromise = notificationRepository.createNotification({
        message,
        actionCreator: userId,
        userId,
        read: false,
        relatedEntity: 'userId',
        title: `Admin ${status}`,
        type: 'MONETIZATION_REQUEST',
    });
    

    const [user, notification] =await  Promise.all([updateUserPromise, notificationPromise, updateRequestPromise]);

    const socketUser = await socketRepository.getUser(
        notification.userId.toString()
    );
    if (socketUser) {
        socketService.notifyUser({
            notificationId: notification.id?.toString() as string,
            socketId: socketUser.socketId,
        });
    }
    return user as IUser;
};
