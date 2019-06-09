import { Store, Action } from '@ngrx/store';
import { Account } from '../model/type.model';

export function userReducer(state: Store<Account> = null, action: any) {
    if (action.type === 'USER_LOGIN') {
        return action.user;
    }
    if (action.type === 'USER_LOGOUT') {
        return null;
    }
    if (action.type === 'USER_INFO') {
        return action.user;
    }
    return state;
}

export function loading(state = true, action: Action) {
    if (action.type === 'LOADED') { return false; }
    return state;
}
