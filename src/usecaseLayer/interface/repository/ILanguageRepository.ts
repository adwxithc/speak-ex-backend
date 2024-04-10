import ILanguage from '../../../domain/language';

export interface ILanguageRepository {
    createLanguage(language:ILanguage): Promise<ILanguage>
}