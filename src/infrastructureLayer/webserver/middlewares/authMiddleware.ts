import { Next, Req, Res } from '../../types/expressTypes';

import { ForbiddenRequestError } from '../../../usecaseLayer/errors';
import {
    IAccessRefreshToken,
    IJwt,
} from '../../../usecaseLayer/interface/services/IJwt.types';


declare module 'express' {
    export interface Request {
        user?: IAccessRefreshToken;
    }
}
interface IProtect {
    protectUser(req: Req, res: Res, next: Next): Promise<void>;
    protectAdmin(req: Req, res: Res, next: Next): Promise<void>;
}

export class Protect implements IProtect {
    readonly jwt: IJwt;
  

    constructor({ jwt }: { jwt: IJwt }) {
        this.jwt = jwt;
    }

    protectUser = async (req: Req, res: Res, next: Next) => {
        const token = req.cookies.accessToken;

        const decoded = await this.jwt.verifyAccessJwt(token);

        if (decoded?.id && ['user', 'admin'].includes(decoded.role)) {
            req.user = decoded;
            return next();
        }

        throw new ForbiddenRequestError();
    };

    protectAdmin = async (req: Req, res: Res, next: Next) => {
        const token = req.cookies.accessToken;

        const decoded = await this.jwt.verifyAccessJwt(token);

        if (decoded?.id && decoded.role == 'admin') {
            const { id, role } = decoded;
            req.user = { id, role };
            return next();
        }

        throw new ForbiddenRequestError();
    };

 
}
