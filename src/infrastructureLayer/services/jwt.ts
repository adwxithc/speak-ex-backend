import jwt from 'jsonwebtoken';


// import IUser from '../../domainLayer/user';
import {IJwt, IToken, IVerificationJwt } from '../../usecaseLayer/interface/services/IJwt.types';



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

    async createAccessAndRefreshToken(id: string): Promise<IToken> {
        const accessToken = jwt.sign({id:id},this.JWT_ACCESS_KEY,{
            expiresIn:'5h'
        });
        const refreshToken =jwt.sign({id:id},this.JWT_REFRESH_KEY,{
            expiresIn:'1y'
        });
        return {accessToken, refreshToken};
    }

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