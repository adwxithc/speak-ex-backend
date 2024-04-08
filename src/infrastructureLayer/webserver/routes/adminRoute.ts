import {body } from 'express-validator';
import { Router } from 'express';
import { validateRequest} from '../middlewares';

import { adminController } from './injections/adminInjection'; 

import {Req, Res} from '../../types/expressTypes';


export function adminRoute (router:Router) {
    router.post(
        '/singin',
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
        });

    return router;
}
