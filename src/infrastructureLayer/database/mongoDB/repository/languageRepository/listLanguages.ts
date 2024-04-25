import ILanguage from '../../../../../domain/language';
import LanguageModel from '../../models/languageModel';

export const listLanguages = async (
    { page, limit, key }: { page: number; limit: number; key: string },
    languageModel: typeof LanguageModel
): Promise<{languages: ILanguage[];totalLanguages: number;}> => {
    const languages = await languageModel.find({
        name: { $regex: new RegExp(`^${key}`, 'i') } 
    })
        .sort({ updatedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select('-password');

    const totalLanguages = await languageModel.countDocuments({name: { $regex: new RegExp(`^${key}`, 'i') } });
    
    return {languages,totalLanguages};
};