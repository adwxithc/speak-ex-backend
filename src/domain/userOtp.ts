 interface IUserOtp{
    email:string;
    otp: number;
    expiresAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export default IUserOtp;