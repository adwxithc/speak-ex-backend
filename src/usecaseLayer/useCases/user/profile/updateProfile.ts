import { BadRequestError } from '../../../errors';
import { IUserRepository } from '../../../interface/repository/IUserRepository';
import { IFileBucket } from '../../../interface/services/IFileBucket';
import { IImageFormater } from '../../../interface/services/IImageFormater';

export const updateProfile = async ({
    userId,
    imageFile,
    userRepository,
    fileBucket,
    imageFormater
}: {
    userId: string;
    imageFile: Express.Multer.File | undefined;
    userRepository: IUserRepository;
    fileBucket: IFileBucket;
    imageFormater:IImageFormater
}) => {
    let imageName = '',
        url = '';
    const user = await userRepository.findUserById(userId);
    if (!user) throw new BadRequestError('invalid user');
    if (imageFile) {
        const formatedImageBuffer = await imageFormater.crop({imageBuffer:imageFile.buffer,aspectRatio:1, format:'jpeg', maxHeight:320,maxWidth:320});
        imageName = await fileBucket.uploadImage({
            imageBuffer: formatedImageBuffer,
            mimetype: imageFile.mimetype,
        });
        url = fileBucket.getFileAccessURL(imageName);
    }
    if (user?.profile) await fileBucket.deleteFile(user.profile);

    await userRepository.updateUser({ id: userId, profile: imageName });
    return url;
};
