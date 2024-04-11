import IAdmin from '../../../domain/admin';
import { BadRequestError } from '../../errors';
import { IAdminRepository } from '../../interface/repository/IAdminRepository';
import { IHashpassword } from '../../interface/services/IHashPassword';
import { IJwt, IToken } from '../../interface/services/IJwt.types';

export const login = async ({
    adminRepository,
    bcrypt,
    jwtToken,
    email,
    password,
}: {
    adminRepository: IAdminRepository;
    bcrypt: IHashpassword;
    jwtToken: IJwt;
    email: string;
    password: string;
}):Promise<{admin:IAdmin,token:IToken} | never> => {

    const admin = await adminRepository.findAdminByEmail(email);
    if(!admin) throw new BadRequestError('invalid email or password');

    const hashPassword = admin.password;
    const passwordMatch =  await bcrypt.comparePassword(password,hashPassword);

    if(!passwordMatch) throw new BadRequestError('invalid email or password');    

    const token =  jwtToken.createAccessAndRefreshToken(admin.id as string);
    
    admin.password='';

    return {admin, token};
};