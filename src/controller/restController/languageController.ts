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
    
}