import { body } from 'express-validator';
import { Router } from 'express';

import { validateRequest } from '../middlewares';

import { userController } from './injections/userInjection';
import { protect } from './injections/middlewareInjection';
import { Req, Res } from '../../types/expressTypes';
import { upload } from '../middlewares/multer';



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

    router.get('/refresh', async (req: Req, res: Res) => {
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

    router.put(
        '/profile',
        protect.protectUser,
        upload.single('image'),
        async (req: Req, res: Res) => {
            await userController.updateProfile(req, res);
        }
    );

    router.put(
        '/',
        [
            body('firstName')
                .optional()
                .isLength({ min: 3 })
                .withMessage('Name must be atleast 3 characters long'),
            body('userName')
                .optional()
                .isLength({ min: 3 })
                .withMessage('User name must be atleast 3 character long'),
            body('blocked')
                .optional()
                .isBoolean()
                .withMessage('Blocked must be a boolean'),
            body('password')
                .optional()
                .trim()
                .isLength({ min: 4, max: 20 })
                .withMessage('password must be between 4 and 20 characters'),
            body('focusLanguage')
                .optional()
                .isString()
                .withMessage('Focus language must be a string'),
            body('proficientLanguage')
                .optional()
                .isArray()
                .withMessage('invalid Proficient languages entry')
        ],
        validateRequest,
        protect.protectUser,
        async(req:Req, res:Res)=>{
            
            await userController.updateUser(req, res);
        }
    );

    router.get(
        '/languages',
        protect.protectUser,
        async(req:Req, res:Res)=>{
            await userController.listLanguages(req, res);
        }
    );

    router.get(
        '/',
        protect.protectUser,
        async (req:Req, res:Res)=>{
            await userController.searchUsers(req, res);
        }
    );
    router.get(
        '/:userName',
        protect.protectUser,
        async (req:Req, res:Res)=>{
            await userController.getUser(req, res);
        }
    );

    router.get(
        '/id/:userId',
        protect.protectUser,
        async (req:Req, res:Res)=>{
            await userController.getUserById(req,res);
        }
    );

    router.put(
        '/follow/:userId',
        protect.protectUser,
        async(req:Req, res:Res)=>{
            await userController.follow(req, res);
        }
    );

    router.put(
        '/unfollow/:userId',
        protect.protectUser,
        async(req:Req, res:Res)=>{
            await userController.unfollow(req, res);

        }
    );

    router.get(
        '/:userName/followers',
        protect.protectUser,
        async(req:Req, res:Res)=>{
            await userController.getFollowers(req, res);
        }
    );

    router.get(
        '/:userName/followings',
        protect.protectUser,
        async(req:Req, res:Res)=>{
          
            await userController.getFollowings(req, res);
           
            
        }
    );

    
   
 
    return router;  
}
  