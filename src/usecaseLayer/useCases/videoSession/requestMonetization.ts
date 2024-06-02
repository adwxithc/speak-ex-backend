import { BadRequestError } from '../../errors';
import { IMonetizationRequestRepository } from '../../interface/repository/IMonetizationRequestRepository';
import { IUserRepository } from '../../interface/repository/IUserRepository';

export const requestMonetization = async ({
    userId,
    description,
    monetizationRequestRepository,
    userRepository,
}: {
    userId: string;
    description: string;
    monetizationRequestRepository: IMonetizationRequestRepository;
    userRepository: IUserRepository;
}) => {
    const user = await userRepository.findUserById(userId);
    if (user?.requestedForMonetization)
        throw new BadRequestError('user already requested for monetization');

    const createReqestPromise = monetizationRequestRepository.create({
        userId,
        description,
    });
    const updateUserPromise = userRepository.updateUser({
        id: userId,
        requestedForMonetization: true,
    });
    const [request] = await Promise.all([
        createReqestPromise,
        updateUserPromise,
    ]);
    return request;
};
