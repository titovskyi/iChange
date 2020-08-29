import { Injectable } from '@angular/core';
import { User } from './user.model';
import { PostFactory } from '~/app/models/post/post.factory';

@Injectable({
    providedIn: 'root'
})
export class UserFactory {
    private static readonly SERVER_URL = 'http://192.168.0.102:3000/uploads/';

    // #############################################

    constructor(private postFactory: PostFactory) {}

    // #############################################

    public create(userServerData): User {
        const fullAvatarPath = userServerData.avatar ? UserFactory.SERVER_URL + userServerData.avatar : null;
        const userData = {
            id: userServerData.id,
            phone: userServerData.phone,
            authToken: userServerData.authToken,
            name: userServerData.name || null,
            avatar: fullAvatarPath,
            country: userServerData.country || null,
            city: userServerData.city || null,
            about: userServerData.about || null,
            posts: userServerData.posts ? this.postFactory.getAll(userServerData.posts) : []
        };

        return new User(
            userData.id,
            userData.phone,
            userData.authToken,
            userData.name,
            userData.avatar,
            userData.country,
            userData.city,
            userData.about,
            userData.posts
        );
    }

    // #############################################
}
