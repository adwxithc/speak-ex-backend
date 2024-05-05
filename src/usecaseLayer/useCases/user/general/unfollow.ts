import { BadRequestError } from '../../../errors';
import { IUserRepository } from '../../../interface/repository/IUserRepository';



export const unfollow = async ({
    userRepository,
    followerId,
    followedUserId
}: {
    userRepository: IUserRepository;
    followerId:string,
    followedUserId:string
}) => {
    if(followerId==followedUserId) throw new BadRequestError('a user canot unfollow him/her self');
    await userRepository.unfollow({
        followerId,
        followedUserId
    });
};
