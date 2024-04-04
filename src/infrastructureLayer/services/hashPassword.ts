import bcrypt from 'bcryptjs';
import { IHashpassword } from '../../usecaseLayer/interface/services/IHashPassword';

export class Encrypt implements IHashpassword{
    constructor(){}

    async createHash(password: string): Promise<string> {
        const hashPassword = await bcrypt.hash(password, 10);
        return hashPassword;
    }

    async comparePassword(password: string, hashPassword: string): Promise<boolean> {
        const passwordMatch = await bcrypt.compare(password, hashPassword);
        return passwordMatch;
    }
}