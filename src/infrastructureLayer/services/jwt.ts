import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// import IUser from '../../domainLayer/user';
import {IJwt, IVerificationJwt } from '../../usecaseLayer/interface/services/IJwt.types';

dotenv.config();

export class JWTToken implements IJwt {
    JWT_VERIFICATION_KEY = process.env.JWT_VERIFICATION_KEY || '';
    JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY || '';
    JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY || '';
    

    createVerificationJWT(payload: IVerificationJwt): string {
        console.log('JWT_VERIFICATION_KEY',this.JWT_VERIFICATION_KEY);
        const verifyToken = jwt.sign(payload, this.JWT_VERIFICATION_KEY,{
            expiresIn: '2m'
        });
        return verifyToken;
    }

    // createAccessAndRefreshToken(id: string): Promise<IToken> {
        
    // }

    verifyJwt(token: string): Promise<IVerificationJwt | null> {
        return new Promise((resolve, reject)=>{
            jwt.verify(token, this.JWT_VERIFICATION_KEY,(err, decoded)=>{
                if(err){
                    reject(null);
                }else{
                    resolve(decoded as IVerificationJwt);
                }
            });
        });
        
    }

    // forgotPasswordToken(userId: string, email: string): Promise<string> {
        
    // }

}