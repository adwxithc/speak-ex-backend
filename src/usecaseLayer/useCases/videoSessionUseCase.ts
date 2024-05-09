import { ISessionRepository } from '../interface/repository/ISessionRepository';
import { IGenerateUniQueString } from '../interface/services/IGenerateUniQueString';
import { IVideoSessionUseCase } from '../interface/usecase/videoSessionUseCase';
import { startSession } from './videoSession/';


export class VideoSessionUseCase implements  IVideoSessionUseCase{

    private readonly generateUniqueString: IGenerateUniQueString;
    private readonly sessionRepository: ISessionRepository;

    constructor({generateUniqueString,sessionRepository}:{generateUniqueString:IGenerateUniQueString,sessionRepository:ISessionRepository}){

        this.sessionRepository=sessionRepository;
        this.generateUniqueString=generateUniqueString;
    }
       
    //startSession
    async startSession({userId}:{userId:string}){   
        return await startSession({userId,sessionRepository:this.sessionRepository,generateUniqueString:this.generateUniqueString});
    }

  

}
