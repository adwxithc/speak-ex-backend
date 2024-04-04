interface IUnverifiedUser {
    id?: string;
    firstName:string;
    lastName:string;
    username:string;
    email:string;
    password:string;
    otp: number;
    expiresAt?: Date;
    createdAt?: Date;
}

export default  IUnverifiedUser;