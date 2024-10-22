
import { IUserRepository } from '../../../interface/repository/IUserRepository';
import { NotAuthorizedError } from '../../../errors';
import { IAccessRefreshToken, IJwt } from '../../../interface/services/IJwt.types';

export const renewAccess = async ({
    UserRepository,
    jwtToken,
    token,
}: {
    UserRepository: IUserRepository;
    jwtToken: IJwt;
    token: string;
}) => {
    if (token) {
        
        const decoded = await jwtToken.verifyRefreshJwt(token);
        
        if (decoded?.id && ['user','admin'].includes(decoded.role)) {
            if(decoded.role=='admin'){

                const data = {
                    id: decoded.id,
                    role: 'admin',
                };

                const accessToken = jwtToken.createAccessToken(
                    data as IAccessRefreshToken
                );
                return accessToken;
            }

            const user = await UserRepository.findUserById(decoded.id);

            if (!user || user.blocked) throw new NotAuthorizedError();
            const data = {
                id: user.id,
                role: 'user',
            };

            const accessToken = jwtToken.createAccessToken(
                data as IAccessRefreshToken
            );

            return accessToken;
        }   
    }
    throw new NotAuthorizedError();
};
