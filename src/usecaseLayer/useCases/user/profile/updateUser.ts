
import { IUserRepository } from '../../../interface/repository/IUserRepository';


export const updateUser = async ({
    id, firstName, lastName, email, blocked 

}: {
    id: string; firstName?: string; lastName?: string ; email?: string ; blocked?: boolean; 

},UserRepository: IUserRepository) => {

    return await UserRepository.updateUser({id, firstName, lastName, email, blocked});

};