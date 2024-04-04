// import IUser from '../../../domainLayer/user';

export interface IVerificationJwt{
    userName:string;
    email:string
}

export interface IToken {
    accessToken: string;
    refreshToken: string;
}

export interface IJwt {
    createVerificationJWT(payload: IVerificationJwt): string;
    createAccessAndRefreshToken(id: string): Promise<IToken>;
    verifyJwt(token: string): Promise< IVerificationJwt | null >;
    // forgotPasswordToken(userId: string, email: string): Promise<string>
}