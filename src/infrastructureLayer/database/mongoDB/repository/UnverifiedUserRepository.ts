import UnverifiedUserModel from '../models/UnverifiedUserModel';
import IUnverifiedUser from '../../../../domain/unverifiedUser';
import { IUnverifiedUserRepository } from '../../../../usecaseLayer/interface/repository/IUnverifiedUserRepository';

export class UnverifiedUserRepository implements IUnverifiedUserRepository {
    async findUser(email: string): Promise<IUnverifiedUser | null> {
        const isUserExist = await UnverifiedUserModel.findOne({ email });

        if (!isUserExist) return null;
        return isUserExist;
    }

    async createUserCollection(
        newUser: IUnverifiedUser
    ): Promise<IUnverifiedUser> {
        const result = await UnverifiedUserModel.create(newUser);
        return result;
    }

    async upsert(newUser: IUnverifiedUser): Promise<IUnverifiedUser> {
        
        const result = await UnverifiedUserModel.findOneAndUpdate(
            { email: newUser.email },
            {
                ...newUser,
            },
            { upsert: true, new: true }
        );
        
        
        return result;
    }

    async findUserAndDelete(
        email: string
    ): Promise<boolean | IUnverifiedUser | null> {
        const result = await UnverifiedUserModel.findOneAndDelete({ email });
        return result;
    }

    async findUserWithOTP(
        email: string,
        otpFromUser: string
    ): Promise<IUnverifiedUser | null> {
        return await UnverifiedUserModel.findOne({ otp: otpFromUser });
    }
}
