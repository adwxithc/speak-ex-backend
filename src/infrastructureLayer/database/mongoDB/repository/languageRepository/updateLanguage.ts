
import LanguageModel from '../../models/languageModel';


export const updateLanguage = async({basePrice,rate,languageId,languageModel}:{basePrice:number,rate:number,languageId:string,languageModel:typeof LanguageModel})=>{

    return await languageModel.findOneAndUpdate({_id:languageId},{basePrice,rate},{new:true});
};