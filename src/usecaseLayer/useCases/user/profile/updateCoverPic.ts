import { BadRequestError } from '../../../errors';
import { IUserRepository } from '../../../interface/repository/IUserRepository';
import { IFileBucket } from '../../../interface/services/IFileBucket';
import { IImageFormater } from '../../../interface/services/IImageFormater';

export const updateCoverPic = async ({
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
        const formatedImageBuffer = await imageFormater.crop({imageBuffer:imageFile.buffer,aspectRatio:4/1, format:'jpeg', maxHeight:396 ,maxWidth:1584});
        
        imageName = await fileBucket.uploadImage({
            imageBuffer: formatedImageBuffer,
            mimetype: imageFile.mimetype,
        });
        console.log(imageName);
        
        url = fileBucket.getFileAccessURL(imageName);
    }
    if (user?.coverPic) await fileBucket.deleteFile(user.coverPic);

    await userRepository.updateUser({ id: userId, coverPic: imageName });
    return url;
};
