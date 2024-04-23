import mongoose from 'mongoose';
import { IPostRepository } from '../../interface/repository/IPostRepository';
import { IUserRepository } from '../../interface/repository/IUserRepository';
import { IFileBucket } from '../../interface/services/IFileBucket';

export const createPost = async ({
    postRepository,
    fileBucket,
    title,
    content,
    imageFile,
    userId,
}: {
    postRepository: IPostRepository;
    userRepository: IUserRepository;
    fileBucket: IFileBucket;
    title: string;
    content: string;
    imageFile: Express.Multer.File;
    userId: string;
}) => {
    let image = '';
    if (imageFile) {
        image = await fileBucket.uploadImage({
            mimetype: imageFile.mimetype,
            imageBuffer: imageFile.buffer,
        });
    }

    const post = await postRepository.createPost({
        title,
        image,
        content,
        userId: new mongoose.Types.ObjectId(userId),
    });

    post.image = fileBucket.getFileAccessURL(post.image as string);
    return post;
};
