import LanguageModel from '../models/languageModel';
// import ILanguage from '../../../../domain/language';
import { ILanguageRepository } from '../../../../usecaseLayer/interface/repository/ILanguageRepository';
import ILanguage from '../../../../domain/language';

import { createLanguage, listLanguages,getLanguages, getAllLanguages } from './languageRepository/index';

export class LanguageRepository implements ILanguageRepository {
    constructor(private languageModel: typeof LanguageModel) {}

    async createLanguage(language: ILanguage): Promise<ILanguage> {
        return await createLanguage(language, this.languageModel);
    }
    async listLanguages({
        page,
        limit,
        key,
    }: {
        page: number;
        limit: number;
        key: string;
    }): Promise<{ languages: ILanguage[]; totalLanguages: number }> {
        return await listLanguages({ page, limit, key }, this.languageModel);
    }

    async getLanguages({ languageIds }: { languageIds: string[]; }): Promise<ILanguage[]> {
        return await getLanguages(
            {languageIds},
            this.languageModel
        );
    }

    async getAllLanguages(): Promise<ILanguage[]> {
        return await getAllLanguages(this.languageModel);
    }
}
