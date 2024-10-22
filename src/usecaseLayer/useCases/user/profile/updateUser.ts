
import { BadRequestError } from '../../../errors';
import { ILanguageRepository } from '../../../interface/repository/ILanguageRepository';
import { IUserRepository } from '../../../interface/repository/IUserRepository';
import { IFileBucket } from '../../../interface/services/IFileBucket';
import { IValidateDbObjects } from '../../../interface/services/validateDbObjects';


export const updateUser = async ({
    id,
    firstName,
    lastName,
    userName,
    password,
    focusLanguage,
    proficientLanguage,
    userRepository,
    languageRepository,
    fileBucket,
    validateDbObjects

}: {
    id: string;
    firstName?: string;
    lastName?: string;
    userName?:string,
    password?:string,
    focusLanguage?:string,
    proficientLanguage?:string[],
    userRepository: IUserRepository,
    languageRepository:ILanguageRepository,
    fileBucket:IFileBucket,
    validateDbObjects:IValidateDbObjects

}) => {
    
   
    
    if (proficientLanguage && proficientLanguage.length > 0 || focusLanguage) {
        // Combine proficient and focus language IDs
        const allLanguageIds=[];
        if(proficientLanguage && proficientLanguage.length>0) allLanguageIds.push(...proficientLanguage);
        if(focusLanguage)allLanguageIds.push(focusLanguage);
        const validatedIds=allLanguageIds.filter((id)=>validateDbObjects.validateId(id)); 
        const fetchedLanguages = await languageRepository.getLanguages({ languageIds: validatedIds });

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
     

    const newUserData= await userRepository.updateUser({
        id,
        firstName,
        lastName,
        userName,
        password,
        focusLanguage,
        proficientLanguage,
    });

    newUserData.profile=fileBucket.getFileAccessURL(newUserData.profile || '');
    newUserData.coverPic=fileBucket.getFileAccessURL(newUserData.coverPic||'');
    return newUserData;
};