import { body } from 'express-validator';
import { Router } from 'express';
import { validateRequest } from '../middlewares';

import { adminController } from './injections/adminInjection';
import { userController } from './injections/userInjection';

import { Req, Res } from '../../types/expressTypes';

export function adminRoute(router: Router) {
    router.post(
        '/sigin',
        [
            body('email').isEmail().withMessage('Email must be valid'),
            body('password')
                .trim()
                .isLength({ min: 4, max: 20 })
                .withMessage('password must be between 4 and 20 characters'),
        ],
        validateRequest,
        async (req: Req, res: Res) => {
            await adminController.signin(req, res);
        }
    );

    router.get('/users-list', async (req: Req, res: Res) => {
        await userController.listUsers(req, res);
    });

    router.get(
        '/update-user/:id',
        [
            body('email')
                .optional()
                .isEmail()
                .withMessage('Email must be valid'),
            body('firstName')
                .optional()
                .isLength({ min: 3 })
                .withMessage('Name must be atleast 3 characters long'),
            body('blocked')
                .optional()
                .isBoolean()
                .withMessage('Blocked must be a boolean'),
        ],
        validateRequest,
        async (req: Req, res: Res) => {
            await userController.adminUpdateUser(req, res);
        }
    );

    return router;
}
