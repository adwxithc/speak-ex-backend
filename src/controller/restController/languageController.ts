import { Req, Res } from '../../infrastructureLayer/types/expressTypes';
import { BadRequestError } from '../../usecaseLayer/errors';

import { ILanguageUseCase } from '../../usecaseLayer/interface/usecase/languageUseCase';


export class LanguageController {
    constructor(private languageUseCase: ILanguageUseCase) {}

    async createLanguage(req:Req, res:Res){
        const {name, basePrice} = req.body;
        const newLanguage = await this.languageUseCase.createLanguage({name,basePrice});

        res.json({
            success:true,
            data:newLanguage,
            message:'new language created'
        });
    }

    async listLanguages (req:Req, res:Res){

        const {page =1,limit=5,key=''}=req.query;
        
        const pageNumber = parseInt(page as string);
        const limitNumber = parseInt(limit as string);

        if(typeof pageNumber !== 'number' || typeof limitNumber !== 'number' || typeof key !== 'string'){
            throw new BadRequestError('invalid parameters');
        }

        const languageData = await this.languageUseCase.listLanguages({page:pageNumber,limit:limitNumber,key});

        res.status(200).json({
            success:true,
            data:languageData
        });
    }

    async getLearnerHelperRatio(req:Req, res:Res){
        const {languageId}  =  req.params;
        const languageInfo = await this.languageUseCase.getLearnerHelperRatio({languageId});
        res.json({
            success:true,
            data:languageInfo,
        });
    }

    async getMonthlySessions(req:Req, res:Res){
        const {languageId} = req.params;
        const monthlySessions = await this.languageUseCase.getMonthlySessions({languageId});
        res.json({
            success:true,
            data:monthlySessions,
        });
    }

    async updateLanguage(req:Req, res:Res){
        const {rate, basePrice} = req.body;
        const {languageId} = req.params;
        const updatedLanguage = await this.languageUseCase.updateLanguage({rate, basePrice,languageId});

        res.json({
            success:true,
            data:updatedLanguage,
            message:'Language updated successfully'
        });
    }
    
}