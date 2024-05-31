import { body } from 'express-validator';
import { Router,raw } from 'express';


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
        [body('description').exists().withMessage('Description is required')],
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
    router.get('/coin-purchase-plans', async (req: Req, res: Res) => {
        await videoSessionController.getPurchasePlans(req, res);
    });

    // ======== strip integration =============

    router.post(
        '/payment',
        async (req: Req, res: Res) => {
            await videoSessionController.payment(req, res);
        }
    );

    router.post(
        '/webhook',
        raw({type: 'application/json'}),
        async(req:Req, res:Res)=>{
            await videoSessionController.webhook(req, res);
        }
    );
    router.get(
        '/session-datas/:userId',
        protect.protectUser,
        async(req:Req, res:Res)=>{
            await videoSessionController.getSessionData(req, res);
        }
    );

    router.post(
        '/request-monetization',
        [
            body('description')
                .trim()
                .isLength({ min: 1, })
                .withMessage('description is required'),
        ],
        validateRequest,
        protect.protectUser,
        async(req:Req, res:Res)=>{
            await videoSessionController.requestMonetization(req, res);
        }
    );

    router.get(
        '/video-session',
        protect.protectUser,
        async(req:Req, res:Res)=>{
            await videoSessionController.getVideoSessions(req, res);
        }
    );
   

    return router;
}
