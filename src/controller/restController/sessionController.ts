import { Req, Res } from '../../infrastructureLayer/types/expressTypes';

import { IAccessRefreshToken } from '../../usecaseLayer/interface/services/IJwt.types';

import { IVideoSessionUseCase } from '../../usecaseLayer/interface/usecase/videoSessionUseCase';

export class VideoSessionController {
    constructor(private videoSessionUseCase: IVideoSessionUseCase) {}

    async rate(req: Req, res: Res) {
        const {rating} = req.body;
        const{sessionCode } = req.params;
        const {id} = req.user as IAccessRefreshToken;

        const result = await this.videoSessionUseCase.rate({sessionCode,userId:id,rating});

        res.json({
            success:true,
            message:'Rating saved',
            data:result
        });
    }

    async report(req: Req, res: Res){
        const {description} = req.body;
        const {sessionCode} = req.params;
        const {id} = req.user as IAccessRefreshToken;
        const result  = await this.videoSessionUseCase.report({sessionCode,description,reporter:id,});

        res.json({
            success:true,
            message:'Report saved',
            data:result
        });
        
    }
}


