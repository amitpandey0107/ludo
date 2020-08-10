import { LOADING, SUCCESS, ERROR, RELOADING, NONE } from '../Constants/misc';
import { LOGIN_LOADING, LOGIN_FAIL, LOGIN_SUCCEED, LOGIN_RELOAD } from '../Constants/redux_constant.js';

export default function login_reducer(state = {}, action) {

    switch (action.type) {

        case LOGIN_FAIL:
            return Object.assign({}, state, { status: ERROR, error: action.payload, });

        case 'AUTH_EXPIRE':
            return Object.assign({}, state, { status: 'AUTH_EXPIRE', value: 'AUTH_EXPIRE', });

        case LOGIN_LOADING:
            return Object.assign({}, state, { status: LOADING });

        case LOGIN_SUCCEED:
            return Object.assign({}, state, { status: SUCCESS, value: action.payload });

        case LOGIN_RELOAD:
            return Object.assign({}, state, { status: RELOADING, value: action.payload });

        default:
            return Object.assign({}, state, { status: NONE });
    }
}