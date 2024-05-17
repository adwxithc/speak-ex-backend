import LanguageModel from '../models/languageModel';
import { ILanguageRepository } from '../../../../usecaseLayer/interface/repository/ILanguageRepository';
import ILanguage from '../../../../domain/language';
import { createLanguage, listLanguages,getLanguages, getAllLanguages, getLearnerHelperRatio } from './languageRepository/';


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

    async getLearnerHelperRatio({ languageId }: { languageId: string; }){
        return await  getLearnerHelperRatio({languageModel:this.languageModel,languageId});
    }
}
