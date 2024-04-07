import IUserOtp  from '../../../../domainLayer/userOtp';
import UserOtpModel from '../models/userOtpModel';
import { IUserOtpRepository } from '../../../../usecaseLayer/interface/repository/IUserOtp';

export class UserOtpRepository implements IUserOtpRepository {




    async upsert(newUser: IUserOtp): Promise<IUserOtp> {
        
        const{otp} =newUser;
        const result = await UserOtpModel.findOneAndUpdate(
            { email: newUser.email },
            {
                otp,
            },
            { upsert: true, new: true }
        );
        
        
        return result;
    }



    async findUserWithOTP(
        email: string,
        otpFromUser: string
    ): Promise<IUserOtp | null> {
        return await UserOtpModel.findOne({email:email, otp: otpFromUser });
    }
}
