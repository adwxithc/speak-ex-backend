import { IUserRepository } from '../../interface/repository/IUserRepository';

export const updateUser = async (
    {
        id,
        blocked,
    }: {
        id: string;
        blocked?:boolean,
    },
    UserRepository: IUserRepository
) => {
    return await UserRepository.updateUser({
        id,
        blocked
    });
};
