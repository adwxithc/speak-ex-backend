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
    createAccessAndRefreshToken(id: string): IToken;
    verifyJwt(token: string): Promise< IVerificationJwt | null >;
    verifyPasswordResetJwt(token: string): Promise< IVerificationJwt | null >;
    createPasswordResetJWT(payload:IVerificationJwt): string;
    verifyAccessJwt(token:string):Promise<{id:string | null}>
    // forgotPasswordToken(userId: string, email: string): Promise<string>
}