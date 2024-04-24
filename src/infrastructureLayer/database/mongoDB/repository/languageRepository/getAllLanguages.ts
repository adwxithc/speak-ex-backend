import ILanguage from '../../../../../domain/language';
import LanguageModel from '../../models/languageModel';

export const getAllLanguages = async (
    languageModel: typeof LanguageModel
): Promise<ILanguage[]> => {
    return await languageModel.find();
    
};