import ILanguage from '../../../domain/language';

export interface ILanguageRepository {
    createLanguage(language:ILanguage): Promise<ILanguage>
    listLanguages({page,limit,key}:{page:number,limit:number,key:string}):Promise<{languages: ILanguage[];totalLanguages: number;}>;
    getLanguages({languageIds}:{languageIds:string[]}):Promise<ILanguage[]>
}