import { SOCKET_LOADING, SOCKET_FAIL, SOCKET_SUCCEED } from '../Constants/redux_constant';

const apiLoading = () => ({
    type: SOCKET_LOADING
});

const apiSucceed = payload => ({
    type: SOCKET_SUCCEED,
    payload,
});

const apiError = (payload) => ({
    type: SOCKET_FAIL,
    payload
});



export const socket_action = (response) => async (dispatchEvent) => {
    dispatchEvent(apiLoading());
    try {       
        console.log(response);        
        if (response) {           
            dispatchEvent(apiSucceed(response));
        } else {           
            dispatchEvent(apiError(response));
        }            

    } catch (error) {
        console.log('error received SOCKET')
        dispatchEvent(apiError(error));
    }
};
