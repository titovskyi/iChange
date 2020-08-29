import { Post } from '~/app/models/post/post.model';

export interface PostStateInterface {
    posts: Post[];
    selectedPost: Post;
}

export const initialPostState: PostStateInterface = {
    posts: null,
    selectedPost: null
};
