import {AppStateInterface} from "~/app/store/state/app.state";
import {createSelector} from "@ngrx/store";
import {AuthStateInterface} from "~/app/store/state/auth.state";

const selectAuth = (state: AppStateInterface) => state.auth;

export const selectAuthError = createSelector(selectAuth, (state: AuthStateInterface) => state.errorMessage);

