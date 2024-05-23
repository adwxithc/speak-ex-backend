
import { ILanguageRepository } from '../../interface/repository/ILanguageRepository';


export const getLanguage = async ({
    languageId,
    languageRepository,
}: {
    languageId:string,
    languageRepository: ILanguageRepository;

}) => {

    return await languageRepository.findById({languageId});
};