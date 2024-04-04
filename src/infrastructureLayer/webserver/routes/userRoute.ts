import { Request, Response, Router } from 'express';
import { userController } from './injections/injection';
import { Next } from '../../types/expressTypes';

export function userRoute(router: Router) {
    router.post('/signup', async(req: Request, res: Response, next:Next) => {
        await userController.registerUser(req, res, next); 
    });

    return router;
}


