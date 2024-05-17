import { ILanguageRepository } from '../../interface/repository/ILanguageRepository';

export const getLearnerHelperRatio = async ({
    languageId,
    languageRepository,
}: {
    languageId:string,
    languageRepository: ILanguageRepository;

}) => {

    return await languageRepository.getLearnerHelperRatio({languageId});
};