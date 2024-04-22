import { body } from 'express-validator';
import { Router } from 'express';

import { validateRequest } from '../middlewares';

import { postController } from './injections/postInjection';

import { Req, Res } from '../../types/expressTypes';
import { upload } from '../middlewares/multer';
import { protect } from './injections/middlewareInjection';






export function postRoute(router: Router) {
    router.post(
        '/',
        protect.protectUser,
        upload.single('image'),
        [
            body('title')
                .isLength({ min: 1 })
                .withMessage('title is required'),
            body('content').isLength({min:1}).withMessage('content is required'),
        ],
        validateRequest,
        async(req: Req, res: Res)=>{
            
            await postController.createPost(req, res);
        }
    );
    router.get(
        '/user/:userName',
        protect.protectUser,
        async(req:Req, res:Res)=>{
            await postController.getUsersPosts(req,res);
        }
    ); 

    router.get(
        '/:postId',
        protect.protectUser,
        async(req:Req, res:Res)=>{
            await postController.getPost(req,res);
            
        }
    );
 
    return router;
}