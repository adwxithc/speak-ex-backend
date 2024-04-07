interface IUnverifiedUser {
    id?: string;
    firstName:string;
    lastName:string;
    userName:string;
    email:string;
    password:string;
    otp: number;
    expiresAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export default  IUnverifiedUser;