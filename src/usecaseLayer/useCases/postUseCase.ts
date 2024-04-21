import IPost from '../../domain/post';
import { IPostRepository } from '../interface/repository/IPostRepository';
import { IFileBucket } from '../interface/services/IFileBucket';
import { IPostUseCase } from '../interface/usecase/postUseCase';
export class PostUseCase implements IPostUseCase {
    private readonly postRepository: IPostRepository;
    private readonly fileBucket: IFileBucket;

    constructor({
        postRepository,
        fileBucket,
    }: {
        postRepository: IPostRepository;
        fileBucket: IFileBucket;
    }) {
        this.postRepository = postRepository;
        this.fileBucket = fileBucket;
    }

    async createPost({
        title,
        description,
        imageFile,
        userId,
    }: {
        title: string;
        description: string;
        imageFile: Express.Multer.File;
        userId: string;
    }): Promise<IPost> {

        const imageName = await this.fileBucket.uploadImage({
            mimetype: imageFile.mimetype,
            imageBuffer: imageFile.buffer,
        });

        const post = await this.postRepository.createPost({
            title,
            imageName,
            description,
            userId
        });

        return post;
    }
}
