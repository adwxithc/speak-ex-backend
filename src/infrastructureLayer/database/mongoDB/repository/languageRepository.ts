import LanguageModel from '../models/languageModel';
// import ILanguage from '../../../../domain/language';
import { ILanguageRepository } from '../../../../usecaseLayer/interface/repository/ILanguageRepository';
import ILanguage from '../../../../domain/language';

import { createLanguage } from './languageRepository/index';



export class LanguageRepository implements ILanguageRepository{
    constructor(private languageModel: typeof LanguageModel){}

    async createLanguage(language: ILanguage): Promise<ILanguage> {
        return await createLanguage(language,this.languageModel);
    }
}