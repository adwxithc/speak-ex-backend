import { ILanguageRepository } from '../../interface/repository/ILanguageRepository';

export const listLanguages = async ({
    languageRepository,
    page,
    key,
    limit,
}: {
    languageRepository: ILanguageRepository;
    page: number;
    key: string;
    limit: number;
}) => {

    const {languages,totalLanguages} = await languageRepository.listLanguages({key,limit,page});


    const lastPage = Math.ceil(totalLanguages / limit);

    return {languages,totalLanguages,lastPage};
};