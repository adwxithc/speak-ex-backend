import { IPostRepository } from '../../interface/repository/IPostRepository';
import { IFileBucket } from '../../interface/services/IFileBucket';

export const getPopularPost = async ({
    postRepository,
    fileBucket
}:{
    postRepository: IPostRepository;
    fileBucket:IFileBucket
}) => {
    const posts =  await postRepository.getPopularPost();
    posts.forEach(post=>{
        post.image=fileBucket.getFileAccessURL(post.image||'');
        post.userData.profile =fileBucket.getFileAccessURL(post.userData.profile||'');

    });
    return posts;
};
