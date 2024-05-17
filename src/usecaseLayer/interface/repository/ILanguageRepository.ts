import ILanguage from '../../../domain/language';
import { ILanguageInfo } from '../usecase/languageUseCase';

export interface ILanguageRepository {
    createLanguage(language:ILanguage): Promise<ILanguage>
    listLanguages({page,limit,key}:{page:number,limit:number,key:string}):Promise<{languages: ILanguage[];totalLanguages: number;}>;
    getLanguages({languageIds}:{languageIds:string[]}):Promise<ILanguage[]>
    getAllLanguages():Promise<ILanguage[]>
    getLearnerHelperRatio({languageId}:{languageId:string}):Promise<ILanguageInfo>
    updateLanguage({rate, basePrice, languageId}:{rate: number, basePrice: number, languageId: string}):Promise<ILanguage|null>
}