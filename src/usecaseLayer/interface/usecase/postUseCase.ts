import IPost from '../../../domain/post';

export interface IPostUseCase{
    createPost({title,description,imageFile,userId}: {title:string,description:string,imageFile:Express.Multer.File,userId:string}): Promise<IPost | never>
}