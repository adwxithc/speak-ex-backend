
import { IGenerateUniQueString } from '../../usecaseLayer/interface/services/IGenerateUniQueString';


export class GenerateUniQueString implements IGenerateUniQueString{
    getString(): string {
        const randomString = Math.random().toString(36);
        return Date.now().toString(36) + randomString.slice(2);
    }
}