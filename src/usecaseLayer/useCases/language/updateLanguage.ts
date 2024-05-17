import { BadRequestError } from '../../errors';
import { ILanguageRepository } from '../../interface/repository/ILanguageRepository';

export const updateLanguage = async ({
    rate,
    basePrice,
    languageId,
    languageRepository,
}: {
    rate: number;
    basePrice: number;
    languageId:string;
    languageRepository: ILanguageRepository;
}) => {
    const updatedLanguage = await languageRepository.updateLanguage({rate:Number(rate), basePrice:Number(basePrice), languageId,});
    if(!updatedLanguage){
        throw new BadRequestError('invalid language');
    }
    return updatedLanguage;
};
