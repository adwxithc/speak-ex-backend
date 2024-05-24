
import LanguageModel from '../../models/languageModel';

export const findById = async (
    { languageId, languageModel }: { languageId:string, languageModel:typeof LanguageModel},

)=> {
    return await languageModel.findById(languageId);
    
};