import LanguageModel from '../models/languageModel';
// import ILanguage from '../../../../domain/language';
import { ILanguageRepository } from '../../../../usecaseLayer/interface/repository/ILanguageRepository';
import ILanguage from '../../../../domain/language';

import { createLanguage,listLanguages } from './languageRepository/index';



export class LanguageRepository implements ILanguageRepository{
    constructor(private languageModel: typeof LanguageModel){}

    async createLanguage(language: ILanguage): Promise<ILanguage> {
        return await createLanguage(language,this.languageModel);
    }
    async listLanguages({ page, limit, key }: { page: number; limit: number; key: string; }): Promise<{ languages: ILanguage[]; totalLanguages: number; }> {
        return await listLanguages({ page, limit, key },this.languageModel);
    }
}