import ILanguage from '../../../../../domain/language';
import { BadRequestError } from '../../../../../usecaseLayer/errors';
import LanguageModel from '../../models/languageModel';


export const createLanguage = async(
    newLanguage:ILanguage,
    languageModel:typeof LanguageModel
):Promise<ILanguage>=>{

    const lowercaseName = newLanguage.name.toLowerCase();

    // Check if the language already exists 
    const existingLanguage = await languageModel.findOne({ name: { $regex: new RegExp(`^${lowercaseName}$`, 'i') } });

    if (existingLanguage) {
        throw new BadRequestError('Language already exists');
    }

    const language = await languageModel.create(newLanguage);
    await language.save();
    return language;
};