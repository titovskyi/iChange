import { User } from '~/app/models/user/user.model';

export interface AuthStateInterface {
    phone: string,
    confirmCode: number,
    user: User | null;
    errorMessage: string | null;
}

export const initialAuthState: AuthStateInterface = {
    phone: null,
    confirmCode: null,
    user: null,
    errorMessage: null
};
