import { ILanguageRepository } from '../../interface/repository/ILanguageRepository';

export const createLanguage = async (
    { name, basePrice }: { name: string; basePrice: number },
    languageRepository: ILanguageRepository
) => {
    return await languageRepository.createLanguage({basePrice,name});
};
