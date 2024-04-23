
import { BadRequestError } from '../../../errors';
import { ILanguageRepository } from '../../../interface/repository/ILanguageRepository';
import { IUserRepository } from '../../../interface/repository/IUserRepository';


export const updateUser = async ({
    id,
    firstName,
    lastName,
    userName,
    password,
    focusLanguage,
    proficientLanguage,
    userRepository,
    languageRepository

}: {
    id: string;
    firstName?: string;
    lastName?: string;
    userName?:string,
    password?:string,
    focusLanguage?:string,
    proficientLanguage?:string[],
    userRepository: IUserRepository,
    languageRepository:ILanguageRepository

}) => {
    console.log(   id,
        firstName,
        lastName,
        userName,
        password,
        focusLanguage,
        proficientLanguage,
        userRepository,
        languageRepository,`   id,
        firstName,
        lastName,
        userName,
        password,
        focusLanguage,
        proficientLanguage,
        userRepository,
        languageRepository`);
    

    if (proficientLanguage && proficientLanguage.length > 0 || focusLanguage) {
        // Combine proficient and focus language IDs
        const allLanguageIds = [...(proficientLanguage || []), focusLanguage].filter(Boolean); 
        const fetchedLanguages = await languageRepository.getLanguages({ languageIds: allLanguageIds as string[] });

        // Check for missing languages
        const fetchedLanguageIds = fetchedLanguages.map(doc => doc.id);
        const missingLanguageIds = allLanguageIds.filter(id => !fetchedLanguageIds.includes(id));

        if (missingLanguageIds.length > 0) {
            throw new BadRequestError('Invalid language option(s)');
        }
    }

    if(userName){
        const user= await userRepository.findUserByUserName(userName);
        if(user && user.id !== id) throw new BadRequestError('user name already in use');

    }
     

    return await userRepository.updateUser({
        id,
        firstName,
        lastName,
        userName,
        password,
        focusLanguage,
        proficientLanguage,
    });

};