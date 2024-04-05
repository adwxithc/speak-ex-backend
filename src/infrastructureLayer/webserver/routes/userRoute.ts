
import { body } from 'express-validator';
import { Router } from 'express';

import { validateRequest } from '../middlewares';

import { userController } from './injections/injection';
import { Next, Req, Res } from '../../types/expressTypes';


export function userRoute(router: Router) {
    router.post(
        '/signup',[
            body('firstName').isLength({min:3}).withMessage('Name must be atleast 3 characters long'),
            body('userName').isLength({min:3}).withMessage('User name must be atleast 3 character long'),
            body('email').isEmail().withMessage('Email must be valid'),
            body('password').isLength({min:4, max: 20})
                .withMessage('password must be between 4 and 20 characters')
        ],
        validateRequest,
        async(req: Req, res: Res, next:Next) => {
            await userController.registerUser(req, res, next); 
        });

    router.post(
        '/verify-otp',
        async(req:Req, res:Res, next:Next)=>{
            await userController.createUser(req, res, next);
        });

    router.post(
        '/signin',
        async (req:Req, res:Res, next:Next)=>{
            await userController.signin(req,res, next);
        });

    router.post(
        '/forgot-password',
        async(req:Req, res:Res, next:Next)=>{
            await userController.sendPasswordResetMail(req,res,next);
        });

    router.post(
        '/verify-password-reset',
        async(req:Req, res:Res, next:Next)=>{
            await userController.verifyPasswordReset(req,res, next);
        }
    );

    router.post(
        '/reset-password',
        async(req:Req, res:Res, next:Next) =>{
            await userController.resetPassword(req, res, next);
        });

    return router;
}


