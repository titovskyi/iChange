import { AppStateInterface } from '~/app/store/state/app.state';
import { createSelector } from '@ngrx/store';
import { AuthStateInterface } from '~/app/store/state/auth.state';

const selectAuth = (state: AppStateInterface) => state.auth;

export const selectAuthUser = createSelector(selectAuth, (state: AuthStateInterface) => state.user);

export const selectAuthCode = createSelector(selectAuth, (state: AuthStateInterface) => state.confirmCode);
