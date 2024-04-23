import ILanguage from '../../../../../domain/language';
import LanguageModel from '../../models/languageModel';

export const getLanguages = async (
    { languageIds }: { languageIds:string[] },
    languageModel: typeof LanguageModel
): Promise<ILanguage[]> => {
    return await languageModel.find({ _id: { $in: languageIds } });
    
};