import { Req, Res } from '../../infrastructureLayer/types/expressTypes';
import { BadRequestError } from '../../usecaseLayer/errors';

import { IAccessRefreshToken } from '../../usecaseLayer/interface/services/IJwt.types';

import { IVideoSessionUseCase } from '../../usecaseLayer/interface/usecase/videoSessionUseCase';

export class VideoSessionController {
    constructor(private videoSessionUseCase: IVideoSessionUseCase) {}

    async rate(req: Req, res: Res) {
        const {rating} = req.body;
        const{sessionCode } = req.params;
        const {id} = req.user as IAccessRefreshToken;
        console.log(id,'id shoule be end with fef',);
        
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

    async getSession(req:Req, res:Res){
        const {sessionCode} = req.params;
       
        
        const session = await this.videoSessionUseCase.getSession({sessionCode});

        res.json({
            success:true,
            data:session
        });
    }

    async listReports(req:Req, res:Res){

        const {page =1,limit=5}=req.query;
        
        const pageNumber = parseInt(page as string);
        const limitNumber = parseInt(limit as string);

        if(typeof pageNumber !== 'number' || typeof limitNumber !== 'number' ){
            throw new BadRequestError('invalid parameters');
        }

        const sessionReportsData = await this.videoSessionUseCase.listReports({page:pageNumber,limit:limitNumber});

        res.status(200).json({
            success:true,
            data:sessionReportsData
        });
    }

    async createCoinPurchasePlan(req:Req, res:Res){
        const {count, title, price} = req.body;
        const {file} = req;
        const purchasePlan = await this.videoSessionUseCase.createCoinPurchasePlan({count, title, imageFile:file, price});
        res.json({
            success:true,
            data:purchasePlan
        });
    }
}


