import { LOADING, SUCCESS, ERROR, RELOADING, NONE } from '../Constants/misc';
import { GET_SERVER_LOADING, GET_SERVER_FAIL, GET_SERVER_SUCCEED, GET_SERVER_RELOAD } from '../Constants/redux_constant.js';

export default function get_server_reducer(state = {}, action) {

    switch (action.type) {

        case GET_SERVER_FAIL:
            return Object.assign({}, state, { status: ERROR, error: action.payload, });

        case 'AUTH_EXPIRE':
            return Object.assign({}, state, { status: 'AUTH_EXPIRE', value: 'AUTH_EXPIRE', });

        case GET_SERVER_LOADING:
            return Object.assign({}, state, { status: LOADING });

        case GET_SERVER_SUCCEED:
            return Object.assign({}, state, { status: SUCCESS, value: action.payload.data.proto+'://'+action.payload.data.host + ':' + action.payload.data.port });

        case GET_SERVER_RELOAD:
            return Object.assign({}, state, { status: RELOADING, value: action.payload });

        default:
            return Object.assign({}, state, { status: NONE });
    }
}