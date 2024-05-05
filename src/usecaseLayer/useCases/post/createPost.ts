import mongoose from 'mongoose';
import { IPostRepository } from '../../interface/repository/IPostRepository';
import { IFileBucket } from '../../interface/services/IFileBucket';
import { ITagRepository } from '../../interface/repository/ITagRepository';

export const createPost = async ({
    postRepository,
    tagRepository,
    fileBucket,
    title,
    tags,
    content,
    imageFile,
    userId,
}: {
    postRepository: IPostRepository;
    tagRepository:ITagRepository
    fileBucket: IFileBucket;
    title: string;
    tags:string;
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
    const tagArray=tags.split('#').filter(Boolean);

    const post = await postRepository.createPost({
        title,
        image,
        tags:tagArray,
        content,
        userId: new mongoose.Types.ObjectId(userId),
    });

    await tagRepository.addTag({tags:tagArray});

    post.image = fileBucket.getFileAccessURL(post.image as string);
    return post;
};
