import ILanguage from '../../domain/language';
import { ILanguageRepository } from '../interface/repository/ILanguageRepository';
import { ILanguageUseCase } from '../interface/usecase/languageUseCase';

import { createLanguage } from './language';

export class LanguageUseCase implements ILanguageUseCase {
    private readonly languageRepository: ILanguageRepository;

    constructor(languageRepository: ILanguageRepository) {
        this.languageRepository = languageRepository;
    }

    async createLanguage({
        name,
        basePrice,
    }: {
        name: string;
        basePrice: number;
    }): Promise<ILanguage> {
        return await createLanguage(
            { name, basePrice },
            this.languageRepository
        );
    }
}
