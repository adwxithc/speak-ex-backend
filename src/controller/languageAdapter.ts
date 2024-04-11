import { Req, Res } from '../infrastructureLayer/types/expressTypes';

import { ILanguageUseCase } from '../usecaseLayer/interface/usecase/languageUseCase';


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
    
}