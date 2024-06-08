import { body } from 'express-validator';
import { Router } from 'express';

import { validateRequest } from '../middlewares';

import { userController } from './injections/userInjection';
import { protect } from './injections/middlewareInjection';
import { Req, Res } from '../../types/expressTypes';
import { upload } from '../middlewares/multer';

export function userRoute(router: Router) {
    /**
     * @openapi
     * tags:
     *   name: User
     *   description: The User managing API
     */

    /**
     * @openapi
     * /api/user/signup:
     *   post:
     *     summary: User signup
     *     tags: [User]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               firstName:
     *                 type: string
     *               userName:
     *                 type: string
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *             required:
     *               - firstName
     *               - userName
     *               - email
     *               - password
     *     responses:
     *       '200':
     *         description: verification otp has been send to the mail
     *       '400':
     *         description: invalid cridetial are provided
     */
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

    /**
     * @openapi
     * components:
     *   securitySchemes:
     *     userAuth:
     *       type: http
     *       scheme: bearer
     *       bearerFormat: JWT
     * paths:
     *   /api/user/signup/verify-user:
     *     post:
     *       summary: Verify user's OTP for signup
     *       tags:
     *         - User
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 otp:
     *                   type: string
     *               required:
     *                 - otp
     *       responses:
     *         '200':
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   success:
     *                     type: boolean
     *                   data:
     *                     $ref: '#/components/schemas/User'
     *                   message:
     *                     type: string
     *                     example: user created
     */

    router.post(
        '/signup/verify-user',
        [body('otp').isLength({ min: 6, max: 6 }).withMessage('invalid otp')],
        validateRequest,
        async (req: Req, res: Res) => {
            await userController.createUser(req, res);
        }
    );

    /**
     * @openapi
     * components:
     *   securitySchemes:
     *     userAuth:
     *       type: http
     *       scheme: bearer
     *       bearerFormat: JWT
     * paths:
     *   /api/user/signup/verify-user/resend-otp:
     *     post:
     *       summary: Resend users verification OTP for signup
     *       tags:
     *         - User

     */

    router.post(
        '/signup/verify-user/resend-otp',
        async (req: Req, res: Res) => {
            await userController.resendOtp(req, res);
        }
    );
    /**
     * @openapi
     *   /api/user/signin:
     *     post:
     *       summary: User signin
     *       tags:
     *         - User
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 email:
     *                   type: string
     *                 password:
     *                   type: string
     *               required:
     *                 - email
     *                 - password
     *       responses:
     *         '200':
     *           description: Successful signin
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   success:
     *                     type: boolean
     *                   message:
     *                     type: string
     *                     example: Verification OTP has been resent to the mail
     *         '400':
     *           description: Invalid email or password
     */
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
    /**
     * @openapi
     * paths:
     *   /api/user/signout:
     *     post:
     *       summary: user signout
     *       tags:
     *         - User
     *       responses:
     *         '200':
     *           description: successfully logout
     */
    router.post('/signout', async (req: Req, res: Res) => {
        await userController.signout(req, res);
    });
    /**
     * @openapi
     * paths:
     *   /api/user/forgot-password:
     *     post:
     *       summary: user forgot password
     *       tags:
     *         - User
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 email:
     *                   type: string
     *               required:
     *                 - email
     *       responses:
     *         '200':
     *           description: user forgot password request
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   success:
     *                     type: boolean
     *                   message:
     *                     type: string
     *                     example: Verification OTP has been resent to the mail
     *         '400':
     *           description: user account  does not exist please signup
     */
    router.post(
        '/forgot-password',
        [body('email').isEmail().withMessage('Email must be valid')],
        validateRequest,
        async (req: Req, res: Res) => {
            await userController.sendPasswordResetMail(req, res);
        }
    );

    /**
     * @openapi
     * paths:
     *   /api/user/forgot-password/verify-user:
     *     post:
     *       summary: user verify user to reset forgotten password
     *       tags:
     *         - User
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 otp:
     *                   type: string
     *               required:
     *                 - otp
     *       responses:
     *         '200':
     *           description: user forgot password request
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   success:
     *                     type: boolean
     *                   message:
     *                     type: string
     *                     example: your email has been verified please provide new password
     *         '400':
     *           description: token has been expired
     */
    
    router.post(
        '/forgot-password/verify-user',
        [body('otp').isLength({ min: 6, max: 6 }).withMessage('invalid otp')],
        validateRequest,
        async (req: Req, res: Res) => {
            await userController.verifyPasswordReset(req, res);
        }
    );

    /**
     * @openapi
     * paths:
     *   /api/user/forgot-password/reset-password:
     *     post:
     *       summary: user reset new password
     *       tags:
     *         - User
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 password:
     *                   type: string
     *               required:
     *                 - password
     *       responses:
     *         '200':
     *           description: user forgot password reset
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   success:
     *                     type: boolean
     *                   message:
     *                     type: string
     *                     example: new password created please login
     *         '400':
     *           description: token has been expired
     */

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
                .withMessage('invalid Proficient languages entry'),
        ],
        validateRequest,
        protect.protectUser,
        async (req: Req, res: Res) => {
            await userController.updateUser(req, res);
        }
    );
    router.get(
        '/languages',
        protect.protectUser,
        async (req: Req, res: Res) => {
            await userController.listLanguages(req, res);
        }
    );

    router.get('/', protect.protectUser, async (req: Req, res: Res) => {
        await userController.searchUsers(req, res);
    });
    router.get(
        '/userName/:userName',
        protect.protectUser,
        async (req: Req, res: Res) => {
            await userController.getUser(req, res);
        }
    );

    router.get(
        '/id/:userId',
        protect.protectUser,
        async (req: Req, res: Res) => {
            await userController.getUserById(req, res);
        }
    );

    router.put(
        '/follow/:userId',
        protect.protectUser,
        async (req: Req, res: Res) => {
            await userController.follow(req, res);
        }
    );

    router.put(
        '/unfollow/:userId',
        protect.protectUser,
        async (req: Req, res: Res) => {
            await userController.unfollow(req, res);
        }
    );

    router.get(
        '/:userName/followers',
        protect.protectUser,
        async (req: Req, res: Res) => {
            await userController.getFollowers(req, res);
        }
    );

    router.get(
        '/:userName/followings',
        protect.protectUser,
        async (req: Req, res: Res) => {
            await userController.getFollowings(req, res);
        }
    );

    router.get('/wallet', protect.protectUser, async (req: Req, res: Res) => {
        await userController.getWallet(req, res);
    });
    router.get(
        '/notifications',
        protect.protectUser,
        async (req: Req, res: Res) => {
            await userController.getNotifications(req, res);
        }
    );
    router.patch(
        '/notification-readed',
        [
            body('notificationIds')
                .isArray()
                .withMessage('invalid notificationIds'),
        ],
        validateRequest,
        protect.protectUser,
        async (req: Req, res: Res) => {
            await userController.setNotificationReaded(req, res);
        }
    );

    router.get(
        '/notification/:notificationId',
        validateRequest,
        protect.protectUser,
        async (req: Req, res: Res) => {
            await userController.getSingleNotification(req, res);
        }
    );

    return router;
}
