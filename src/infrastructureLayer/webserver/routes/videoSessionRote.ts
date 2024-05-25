import { body } from 'express-validator';
import { Router } from 'express';

import { validateRequest } from '../middlewares';
import { protect } from './injections/middlewareInjection';
import { Req, Res } from '../../types/expressTypes';
import { videoSessionController } from './injections/videoSessionInjection';

export function videoSessionRote(router: Router) {
    router.post(
        '/rate/:sessionCode',
        [
            body('rating')
                .isInt({ min: 1, max: 5 })
                .withMessage('rating must be a number between 1 and 5'),
        ],
        validateRequest,
        protect.protectUser,
        async (req: Req, res: Res) => {
            await videoSessionController.rate(req, res);
        }
    );

    router.post(
        '/report/:sessionCode',
        [
            body('description')
                .exists()
                .withMessage('Description is required')
        ],
        validateRequest,
        protect.protectUser,
        async (req: Req, res: Res) => {
            await videoSessionController.report(req, res);
        }
    );

    router.get(
        '/sessionCode/:sessionCode',
        protect.protectUser,
        async (req: Req, res: Res) => {
            await videoSessionController.getSession(req, res);
        }
    );

    return router;
}
