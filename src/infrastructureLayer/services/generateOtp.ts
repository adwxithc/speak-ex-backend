import { IcreateOTP } from '../../usecaseLayer/interface/services/ICreateOtp';


export class GenerateOTP implements IcreateOTP{
    generateOTP(): number {
        const otp = Math.floor(100000 + Math.random() * 900000);
        return otp;
    }
}