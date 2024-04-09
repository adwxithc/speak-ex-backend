
import { IUserRepository } from '../../interface/repository/IUserRepository';

export const listUsers = async ({
    UserRepository,
    page,
    key,
    limit,
}: {
    UserRepository: IUserRepository;
    page: number;
    key: string;
    limit: number;
}) => {

    const {users,totalUsers} = await UserRepository.listUsers({key,limit,page});


    const lastPage = Math.ceil(totalUsers / limit);

    return {users,totalUsers,lastPage};
};
