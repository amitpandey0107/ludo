import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import login_reducer from '../Reducers/login_reducer';
import get_server_reducer from '../Reducers/get_server_reducer';
import socket_reducer from '../Reducers/socket_reducer';


const rootReducer = combineReducers({
    login_reducer: login_reducer,
    get_server_reducer: get_server_reducer,
    socket_reducer: socket_reducer,
})
const appReducer = {

}
export default createStore(rootReducer, appReducer, applyMiddleware(thunk))