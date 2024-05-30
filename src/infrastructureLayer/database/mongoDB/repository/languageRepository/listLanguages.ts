import LanguageModel from '../../models/languageModel';

export const listLanguages = async (
    { page, limit, key }: { page: number; limit: number; key: string },
    languageModel: typeof LanguageModel
) => {
    const languages = await languageModel.find({
        name: { $regex: new RegExp(`^${key}`, 'i') } 
    })
        .sort({ updatedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    const totalLanguages = await languageModel.countDocuments({name: { $regex: new RegExp(`^${key}`, 'i') } });
    
    return {languages,totalLanguages};
};