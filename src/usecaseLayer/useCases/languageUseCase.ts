
import { ILanguageRepository } from '../interface/repository/ILanguageRepository';
import { ISessionRepository } from '../interface/repository/ISessionRepository';
import { ILanguageUseCase } from '../interface/usecase/languageUseCase';

import { createLanguage,listLanguages,getAllLanguages, getLearnerHelperRatio, getMonthlySessions, updateLanguage, getLanguage } from './language';

export class LanguageUseCase implements ILanguageUseCase {
    private readonly languageRepository: ILanguageRepository;
    private readonly sessionRepository: ISessionRepository;

    constructor({languageRepository,sessionRepository}:{languageRepository: ILanguageRepository,sessionRepository:ISessionRepository}) {
        this.languageRepository = languageRepository;
        this.sessionRepository=sessionRepository;
    }

    async createLanguage({
        name,
        basePrice,
        
    }: {
        name: string;
        basePrice: number;
       
    }){
        return await createLanguage(
            { name, basePrice },
            this.languageRepository
        );
    }
    
    async listLanguages({ page, key, limit }: { page: number; key: string; limit: number; }) {
        const languagesData = await listLanguages({
            languageRepository: this.languageRepository,
            page,
            key,
            limit,
        });
        return languagesData;
    }
    async getAllLanguages(){
        return await getAllLanguages({languageRepository:this.languageRepository});
    }

    async getLearnerHelperRatio({ languageId }: { languageId: string; }){
        return await getLearnerHelperRatio({languageId,languageRepository:this.languageRepository});
    }

    async getMonthlySessions({ languageId }: { languageId: string; }){
        return await getMonthlySessions({languageId, sessionRepository:this.sessionRepository});
    }

    async updateLanguage({ basePrice, rate,languageId }: { basePrice: number; rate: number; languageId:string }) {
        return await updateLanguage({ basePrice, rate, languageId, languageRepository:this.languageRepository });
    }

    async getLanguage({ languageId }: { languageId: string; }) {
        return await getLanguage({languageId,languageRepository:this.languageRepository});
    }
}
