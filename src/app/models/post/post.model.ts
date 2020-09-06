export class Post {
// #############################################

    constructor(
        public id: string,
        public title: string,
        public photos: string[],
        public user: { id: string; name: string; avatar: string },
        public description: string,
        public likes: {postId: string, userId: string}[]
    ) {}

    // #############################################
}
