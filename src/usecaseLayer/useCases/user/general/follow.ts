import { BadRequestError } from '../../../errors';
import { IUserRepository } from '../../../interface/repository/IUserRepository';



export const follow = async ({
    userRepository,
    followerId,
    followedUserId
}: {
    userRepository: IUserRepository;
    followerId:string,
    followedUserId:string
}) => {
    if(followerId==followedUserId) throw new BadRequestError('a user canot follow him/her self');
    await userRepository.follow({
        followerId,
        followedUserId
    });
};
