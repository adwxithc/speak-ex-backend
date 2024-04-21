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
        async(req: Req, res: Res)=>{
            await postController.createPost(req, res);
        }
    );
    router.get('/post/:userName');

    return router;
}