import { ActionReducerMap } from '@ngrx/store';
import { AppStateInterface } from '~/app/store/state/app.state';
import { routerReducer } from '@ngrx/router-store';
import { authReducers } from '~/app/store/reducers/auth.reducers';

export const appReducers: ActionReducerMap<AppStateInterface, any> = {
    router: routerReducer,
    auth: authReducers
};
