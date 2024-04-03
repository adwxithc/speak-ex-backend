interface IUnverifiedUser {
    id?: string;
    firstName:string;
    lastName:string;
    username:string;
    email:string;
    password:string;
    focusLanguage:string;
    proficientLanguage:string[]
    otp: string;
    expiresAt?: Date;
    createdAt?: Date;
}

export default  IUnverifiedUser;