import { body } from 'express-validator';
import { Router } from 'express';
import { validateRequest } from '../middlewares';

import { adminController } from './injections/adminInjection';
import {languageController} from './injections/languageInjection';

import { Req, Res } from '../../types/expressTypes';
import { userController } from './injections/userInjection';

export function adminRoute(router: Router) {
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
            await adminController.signin(req, res);
        }
    );

    router.post('/signout', async (req: Req, res: Res) => {
        await adminController.signout(req, res);
    });

    router.get('/users', async (req: Req, res: Res) => {
        await userController.listUsers(req, res);
    });

    router.put(
        '/user/:id',
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

    router.post('/language', [
        body('name')
            .trim()
            .isLength({ min: 3 })
            .withMessage('Name must be atleast 3 characters long'),
        body('basePrice')
            .isNumeric()
            .withMessage('Base price must be a numeric value')
            .isFloat({ min: 0 })
            .withMessage('Base price should be a positive number'),
    ],
    validateRequest,
    async (req: Req, res: Res) => {
        await languageController.createLanguage(req, res);
    });


    router.get('/languages', async (req: Req, res: Res) => {
        await languageController.listLanguages(req, res);
    });

    return router;
}