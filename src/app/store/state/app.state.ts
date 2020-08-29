import { RouterReducerState } from '@ngrx/router-store';
import { initialAuthState, AuthStateInterface } from '~/app/store/state/auth.state';
import { initialPostState, PostStateInterface } from '~/app/store/state/post.state';

export interface AppStateInterface {
    router?: RouterReducerState;
    auth: AuthStateInterface;
    // posts: PostStateInterface;
}

export const initialAppState = {
    auth: initialAuthState,
    // posts: initialPostState
};

export function getInitialState(): AppStateInterface {
    return initialAppState;
}
