
import ILanguage from '../../../domain/language';



export interface ILanguageUseCase {

    //create language
    createLanguage({name,basePrice}:{name:string,basePrice:number}):Promise<ILanguage | never>


}
