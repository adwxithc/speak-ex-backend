import  'express-async-errors';
import {JWTToken} from '../../services/jwt';
import dotenv from 'dotenv';
dotenv.config();
import UserModel from '../../database/mongoDB/models/userModel';
import { UserRepository } from '../../database/mongoDB/repository/UserRepository';
import { BadRequestError } from '../../../usecaseLayer/errors';
import { Next, Req, Res } from '../../types/expressTypes';
import IUser from '../../../domain/user';

declare module 'express' {
    export interface Request {
      user?: Omit<IUser, 'password'>;
    }
  }

const protect = async(req:Req,res:Res,next:Next)=>{
    
    const token =req.cookies.jwt;
    if(token){
      
        const verifyJwt= new  JWTToken();
        const userRepository = new UserRepository(UserModel);
        const decoded=await verifyJwt.verifyAccessJwt(token);
        if(!decoded?.id){
            throw new BadRequestError('invalid token');
        }

        const {id} = decoded;
        

        req.user=await userRepository.findUserById(id) as Omit<IUser, 'password'>;
        
        if(!req?.user?.blocked){
            next();
        }else{
            res.cookie('jwt','',{
                httpOnly:true,
                expires: new Date(0)
            });
            throw new BadRequestError('access denied');
        }
            
            
        
    }else{

        throw new NotAuthorizedErro();
    }
};



export{
    protect,
};