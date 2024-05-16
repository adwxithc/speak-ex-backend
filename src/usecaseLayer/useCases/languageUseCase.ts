import ILanguage from '../../domain/language';
import { ILanguageRepository } from '../interface/repository/ILanguageRepository';
import { ILanguageInfo, ILanguageUseCase } from '../interface/usecase/languageUseCase';

import { createLanguage,listLanguages,getAllLanguages, getLanguageInfo } from './language';

export class LanguageUseCase implements ILanguageUseCase {
    private readonly languageRepository: ILanguageRepository;

    constructor(languageRepository: ILanguageRepository) {
        this.languageRepository = languageRepository;
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

    async getLanguageInfo({ languageId }: { languageId: string; }): Promise<ILanguageInfo> {
        return await getLanguageInfo({languageId,languageRepository:this.languageRepository});
    }
}
