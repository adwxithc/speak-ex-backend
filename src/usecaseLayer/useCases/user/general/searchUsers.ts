
import { IUserRepository } from '../../../interface/repository/IUserRepository';
import { IFileBucket } from '../../../interface/services/IFileBucket';

export const searchUsers = async ({
    UserRepository,
    fileBucket,
    page,
    key,
    limit,
}: {
    UserRepository: IUserRepository;
    fileBucket:IFileBucket
    page: number;
    key: string;
    limit: number;
}) => {

    const {users,totalUsers} = await UserRepository.searchUser({key,limit,page});
    users.forEach(user=>user.profile=fileBucket.getFileAccessURL(user.profile || ''));

    const lastPage = Math.ceil(totalUsers / limit);

    return {users,totalUsers,lastPage};
};
