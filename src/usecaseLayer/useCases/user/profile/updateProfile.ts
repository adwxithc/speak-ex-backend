import { BadRequestError } from '../../../errors';
import { IUserRepository } from '../../../interface/repository/IUserRepository';
import { IFileBucket } from '../../../interface/services/IFileBucket';

export const updateProfile = async ({
    userId,
    imageFile,
    userRepository,
    fileBucket,
}: {
    userId: string;
    imageFile: Express.Multer.File | undefined;
    userRepository: IUserRepository;
    fileBucket: IFileBucket;
}) => {
    let imageName = '',
        url = '';
    const user = await userRepository.findUserById(userId);
    if (!user) throw new BadRequestError('invalid user');
    if (imageFile) {
        imageName = await fileBucket.uploadImage({
            imageBuffer: imageFile.buffer,
            mimetype: imageFile.mimetype,
        });
        url = fileBucket.getFileAccessURL(imageName);
    }
    if (user?.profile) await fileBucket.deleteFile(user.profile);

    await userRepository.updateUser({ id: userId, profile: imageName });
    return url;
};
