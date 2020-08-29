import { Post } from '../post/post.model';

export class User {
    // #############################################

    constructor(
        public id: string,
        public phone: number,
        public authToken: string,
        public name: string,
        public avatar: string,
        public country: string,
        public city: string,
        public about: string,
        public posts: Post[]
    ) {}

    // #############################################
}
