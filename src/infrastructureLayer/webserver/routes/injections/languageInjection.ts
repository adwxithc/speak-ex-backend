import languageModel from '../../../database/mongoDB/models/languageModel';
import { LanguageRepository } from '../../../database/mongoDB/repository/languageRepository';


import { LanguageUseCase } from '../../../../usecaseLayer/useCases/languageUseCase';

import { LanguageController } from '../../../../controller/languageAdapter';



const languageRepository = new LanguageRepository(languageModel);


const languageUseCase = new LanguageUseCase(
    languageRepository,

);

const languageController = new LanguageController(languageUseCase);

export { languageController };
