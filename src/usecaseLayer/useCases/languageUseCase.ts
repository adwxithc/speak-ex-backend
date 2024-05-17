import ILanguage from '../../domain/language';
import { ILanguageRepository } from '../interface/repository/ILanguageRepository';
import { ISessionRepository } from '../interface/repository/ISessionRepository';
import { ILanguageInfo, ILanguageUseCase, ILnaguageMonthelySessions } from '../interface/usecase/languageUseCase';

import { createLanguage,listLanguages,getAllLanguages, getLearnerHelperRatio, getMonthlySessions } from './language';

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
       
    }): Promise<ILanguage> {
        return await createLanguage(
            { name, basePrice },
            this.languageRepository
        );
    }
    
    async listLanguages({ page, key, limit }: { page: number; key: string; limit: number; }): Promise<{ languages: ILanguage[]; totalLanguages: number; lastPage: number; }> {
        const languagesData = await listLanguages({
            languageRepository: this.languageRepository,
            page,
            key,
            limit,
        });
        return languagesData;
    }
    async getAllLanguages(): Promise<ILanguage[]> {
        return await getAllLanguages({languageRepository:this.languageRepository});
    }

    async getLearnerHelperRatio({ languageId }: { languageId: string; }): Promise<ILanguageInfo> {
        return await getLearnerHelperRatio({languageId,languageRepository:this.languageRepository});
    }

    async getMonthlySessions({ languageId }: { languageId: string; }): Promise<ILnaguageMonthelySessions> {
        return getMonthlySessions({languageId, sessionRepository:this.sessionRepository});
    }
}
