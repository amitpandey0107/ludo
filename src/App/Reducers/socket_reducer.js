import { LOADING, SUCCESS, ERROR, RELOADING, NONE } from '../Constants/misc';
import { SOCKET_LOADING, SOCKET_FAIL, SOCKET_SUCCEED, SOCKET_RELOAD } from '../Constants/redux_constant.js';

export default function socket_reducer(state = {}, action) {

    switch (action.type) {

        case SOCKET_FAIL:
            return Object.assign({}, state, { status: ERROR, error: action.payload, });

        case 'AUTH_EXPIRE':
            return Object.assign({}, state, { status: 'AUTH_EXPIRE', value: 'AUTH_EXPIRE', });

        case SOCKET_LOADING:
            return Object.assign({}, state, { status: LOADING });

        case SOCKET_SUCCEED:
            return Object.assign({}, state, { status: SUCCESS, value: action.payload });

        case SOCKET_RELOAD:
            return Object.assign({}, state, { status: RELOADING, value: action.payload });

        default:
            return Object.assign({}, state, { status: NONE });
    }
}