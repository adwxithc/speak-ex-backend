import { ILanguageRepository } from '../../interface/repository/ILanguageRepository';

export const getAllLanguages = async ({
    languageRepository,
}: {
    languageRepository: ILanguageRepository;

}) => {

    return await languageRepository.getAllLanguages();
};