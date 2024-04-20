import { body } from 'express-validator';
import { Router } from 'express';

import { validateRequest } from '../middlewares';

import { userController } from './injections/userInjection';
import { protect } from './injections/middlewareInjection';
import { Req, Res } from '../../types/expressTypes';
import { upload } from '../middlewares/multer';
import { uploadImageToS3 } from '../../services/fileBucket';





export function userRoute(router: Router) {
    router.post(
        '/signup',
        [
            body('firstName')
                .isLength({ min: 3 })
                .withMessage('Name must be atleast 3 characters long'),
            body('userName')
                .isLength({ min: 3 })
                .withMessage('User name must be atleast 3 character long'),
            body('email').isEmail().withMessage('Email must be valid'),
            body('password')
                .trim()
                .isLength({ min: 4, max: 20 })
                .withMessage('password must be between 4 and 20 characters'),
        ],
        validateRequest,
        async (req: Req, res: Res) => {
            await userController.registerUser(req, res);
        }
    );

    router.post(
        '/signup/verify-user',
        [body('otp').isLength({ min: 6, max: 6 }).withMessage('invalid otp')],
        validateRequest,
        async (req: Req, res: Res) => {
            await userController.createUser(req, res);
        }
    );

    router.post(
        '/signup/verify-user/resend-otp',
        async (req: Req, res: Res) => {
            await userController.resendOtp(req, res);
        }
    );

    router.post(
        '/signin',
        [
            body('email').isEmail().withMessage('Email must be valid'),
            body('password')
                .trim()
                .isLength({ min: 4, max: 20 })
                .withMessage('password must be between 4 and 20 characters'),
        ],
        validateRequest,
        async (req: Req, res: Res) => {
            await userController.signin(req, res);
        }
    );

    router.post('/signout', async (req: Req, res: Res) => {
        await userController.signout(req, res);
    });

    router.post(
        '/forgot-password',
        [body('email').isEmail().withMessage('Email must be valid')],
        validateRequest,
        async (req: Req, res: Res) => {
            await userController.sendPasswordResetMail(req, res);
        }
    );

    router.post(
        '/forgot-password/verify-user',
        [body('otp').isLength({ min: 6, max: 6 }).withMessage('invalid otp')],
        validateRequest,
        async (req: Req, res: Res) => {
            await userController.verifyPasswordReset(req, res);
        }
    );

    router.post(
        '/forgot-password/reset-password',
        [
            body('password')
                .trim()
                .isLength({ min: 4, max: 20 })
                .withMessage('password must be between 4 and 20 characters'),
        ],
        validateRequest,
        async (req: Req, res: Res) => {
            await userController.resetPassword(req, res);
        }
    );

    router.post('/refresh', async (req: Req, res: Res) => {
        await userController.renewAccess(req, res);
    });

    router.post('/protect', protect.protectUser, async (req: Req, res: Res) => {
        
        res.send('entered protected router');
    });

    router.post(
        '/check-userName',
        body('userName')
            .isLength({ min: 3 })
            .withMessage('User name must be atleast 3 character long'),
        validateRequest,
        async (req: Req, res: Res) => {
            await userController.checkUserName(req, res);
        }
    );

    router.post(
        '/upload',
        upload.single('image'),
        async (req: Req, res: Res) => {
           
            if(!req.file) throw new Error('umfi');
            const imageName = await uploadImageToS3({imageBuffer:req.file.buffer, mimetype:req.file.mimetype});
            console.log(req.file);
            console.log(req.body);
            
            
        }   
    );
 

    return router;
}
