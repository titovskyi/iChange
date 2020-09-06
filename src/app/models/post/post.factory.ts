import { Injectable } from '@angular/core';
import { Post } from './post.model';

import { Config } from '../../assets/config';

@Injectable({ providedIn: 'root' })
export class PostFactory {
    private static readonly SERVER_URL = `${Config.api}/uploads/`;

    // #############################################

    public getAll(posts): Post[] {
        return posts.map((post) => {
            return this.create(post);
        });
    }

    // #############################################

    public create(postServerData): Post {
        let fullPostPhotoPath: string[] = [];

        postServerData.photos.forEach((photo) => {
            if (photo.indexOf(PostFactory.SERVER_URL) !== -1) {
                fullPostPhotoPath.push(photo);
            } else {
                fullPostPhotoPath.push(PostFactory.SERVER_URL + photo);
            }
        });

        const postData = {
            id: postServerData.id,
            title: postServerData.title,
            photo: fullPostPhotoPath,
            user: postServerData.user,
            description: postServerData.description || null,
            likes: postServerData.userLike || []
        };

        if (postData.user && postData.user.avatar) {
            postData.user.avatar = PostFactory.SERVER_URL + postData.user.avatar;
        }

        return new Post(
            postData.id,
            postData.title,
            postData.photo,
            postData.user,
            postData.description,
            postData.likes
        );
    }

    // #############################################
}
