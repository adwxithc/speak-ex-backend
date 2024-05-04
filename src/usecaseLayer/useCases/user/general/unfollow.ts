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
    await userRepository.unfollow({
        followerId,
        followedUserId
    });
};
