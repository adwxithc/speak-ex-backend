import { body } from 'express-validator';
import { Router } from 'express';

import { validateRequest } from '../middlewares';

import { Req, Res } from '../../types/expressTypes';

import { protect } from './injections/middlewareInjection';
import { chatController } from './injections/chatInjection';

export function chatRoute(router: Router) {
    router.post(
        '/',
        protect.protectUser,
        [
            body('members')
                .isArray()
                .withMessage('invalid members entry')
        ],
        validateRequest,
        async (req: Req, res: Res) => {
            await chatController.createChatRoom(req, res);
        }
    );


    router.get(
        '/:userId',
        protect.protectUser,
        async(req:Req,res:Res)=>{
            
            await chatController.getChatRooms(req, res);
        }
    );

    router.post(
        '/:roomId/message',
        protect.protectUser,
        [
            body('text')
                .isLength({ min: 1 })
                .withMessage('text is required'),
            body('senderId')
                .isLength({min:1})
                .withMessage('sender id is required')
            
        ],
        validateRequest,
        async (req:Req, res:Res)=>{
            await chatController.createMessage(req, res);
        }
    );

    router.get(
        '/:roomId/messages',
        protect.protectUser,
        async(req:Req, res:Res)=>{
            
            await chatController.getMessages(req, res);
        }
    );


    
    return router;
} 
