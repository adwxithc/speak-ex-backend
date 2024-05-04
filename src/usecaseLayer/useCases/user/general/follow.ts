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
    await userRepository.follow({
        followerId,
        followedUserId
    });
};
