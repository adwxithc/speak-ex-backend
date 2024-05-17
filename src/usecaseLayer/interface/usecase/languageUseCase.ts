
import ILanguage from '../../../domain/language';

export interface ILanguageInfo extends ILanguage{
    learnersCount:number;
    helpersCount:number;
}
export interface ILnaguageMonthelySessions{
    month:string;
    year:string;
    sessionsCount:number;
}

export interface ILanguageUseCase {

    //create language
    createLanguage(language:ILanguage):Promise<ILanguage | never>
    listLanguages({page,key,limit}:{page:number,key:string,limit:number}):Promise<{ languages: ILanguage[]; totalLanguages: number; lastPage: number }>
    getAllLanguages():Promise<ILanguage[]>
    getLearnerHelperRatio({languageId}:{languageId:string}):Promise<ILanguageInfo>
    getMonthlySessions({languageId}:{languageId:string}):Promise<ILnaguageMonthelySessions[]>
    updateLanguage({basePrice,rate, languageId}:{basePrice:number,rate:number, languageId:string}):Promise<ILanguage>
}
