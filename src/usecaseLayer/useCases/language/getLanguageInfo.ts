import { ILanguageRepository } from '../../interface/repository/ILanguageRepository';

export const getLanguageInfo = async ({
    languageId,
    languageRepository,
}: {
    languageId:string,
    languageRepository: ILanguageRepository;

}) => {

    return await languageRepository.getLanguageInfo({languageId});
};