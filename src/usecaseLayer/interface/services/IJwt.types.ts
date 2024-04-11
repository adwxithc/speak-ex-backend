// import IUser from '../../../domainLayer/user';

export interface IVerificationJwt{
    userName:string;
    email:string
}

export interface IToken {
    accessToken: string;
    refreshToken: string;
}

export interface IAccessRefreshToken{
    id:string;
    role:'user'|'admin'
}

export interface IJwt {
    createVerificationJWT(payload: IVerificationJwt): string;
    createAccessAndRefreshToken(payload:IAccessRefreshToken): IToken;
    verifyJwt(token: string): Promise< IVerificationJwt | null >;
    verifyPasswordResetJwt(token: string): Promise< IVerificationJwt | null >;
    createPasswordResetJWT(payload:IVerificationJwt): string;
    
    verifyAccessJwt(token:string):Promise<IAccessRefreshToken| null>
    verifyRefreshJwt(token:string):Promise<IAccessRefreshToken| null>
    createAccessToken(payload:IAccessRefreshToken):string
    // forgotPasswordToken(userId: string, email: string): Promise<string>
}