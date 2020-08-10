import { LOGIN_LOADING, LOGIN_FAIL, LOGIN_SUCCEED } from '../Constants/redux_constant';

const apiLoading = () => ({
    type: LOGIN_LOADING
});

const apiSucceed = payload => ({
    type: LOGIN_SUCCEED,
    payload,
});

const apiError = (payload) => ({
    type: LOGIN_FAIL,
    payload
});



export const login_action = (token, istrue) => async (dispatchEvent) => {
    dispatchEvent(apiLoading());
    try {       
        // console.log(token, istrue);        
        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('loggedIn', istrue);  
            dispatchEvent(apiSucceed(true));
        } else {           
            dispatchEvent(apiError(false));
        }
        // var token = localStorage.getItem('token');
        // var loggedIn = localStorage.getItem('loggedIn');
        // console.log(loggedIn);
        // if (token && loggedIn==="true") {
        //     dispatchEvent(apiSucceed(loggedIn));
        // } else {
        //     // console.log(loggedIn);
        //     dispatchEvent(apiError(loggedIn));
        // }       

    } catch (error) {
        console.log('error received login')
        dispatchEvent(apiError(error));
    }
};
