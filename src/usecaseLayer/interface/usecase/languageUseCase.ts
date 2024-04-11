
import ILanguage from '../../../domain/language';



export interface ILanguageUseCase {

    //create language
    createLanguage({name,basePrice}:{name:string,basePrice:number}):Promise<ILanguage | never>
    listLanguages({page,key,limit}:{page:number,key:string,limit:number}):Promise<{ languages: ILanguage[]; totalLanguages: number; lastPage: number }>

}
