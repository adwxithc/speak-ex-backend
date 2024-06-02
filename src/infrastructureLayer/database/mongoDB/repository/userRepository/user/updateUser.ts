import IUser from '../../../../../../domain/user';
import { BadRequestError } from '../../../../../../usecaseLayer/errors';
import UserModel from '../../../models/userModel';

export const updateUser = async (
    {
        id,
        firstName,
        lastName,
        userName,
        blocked,
        profile,
        proficientLanguage,
        focusLanguage,
        requestedForMonetization,
        isMonetized,
    }: Required<Pick<IUser, 'id'>> & Partial<Omit<IUser, 'email'>>,
    userModels: typeof UserModel
) => {
    const user = await userModels.findById(id);

    if (!user) {
        throw new BadRequestError('invalid user');
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.userName = userName || user.userName;
    user.blocked = blocked !== undefined ? blocked : user.blocked;
    user.profile = profile || user.profile;
    user.focusLanguage = focusLanguage || user.focusLanguage;
    user.proficientLanguage = proficientLanguage || user.proficientLanguage;
    user.requestedForMonetization =
        requestedForMonetization || user.requestedForMonetization;
    user.isMonetized =
        isMonetized !== undefined ? isMonetized : user.isMonetized;

    const updatedUser = await user.save();
    updatedUser.password = '';

    return updatedUser;
};
