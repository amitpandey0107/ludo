import axios from 'axios';
import { GET_SERVER_LOADING, GET_SERVER_FAIL, GET_SERVER_SUCCEED } from '../Constants/redux_constant';
const SERVER_URL = 'http://3.6.140.2:3011/chooseServer';

const apiLoading = () => ({
    type: GET_SERVER_LOADING
});

const apiSucceed = payload => ({
    type: GET_SERVER_SUCCEED,
    payload,
});

const apiError = (payload) => ({
    type: GET_SERVER_FAIL,
    payload
});



export const get_server_action = () => async (dispatchEvent) => {       
    dispatchEvent(apiLoading());
    const method = 'get';
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    try {
        axios({
            method,
            url: proxyurl + SERVER_URL,
            mode: 'no-cors', 
        }).then((response) => {            
            localStorage.setItem('SERVER_HOST', response.data.host);
            localStorage.setItem('SERVER_PORT', response.data.port);
            dispatchEvent(apiSucceed(response));            
        }).catch((error) => {
            console.log('ERROR IN GET SERVER ACTION', error)
            dispatchEvent(apiError(error));
        })

    } catch (error) {
        console.log('SOME TECHNICAL ERROR OCCURED')
        dispatchEvent(apiError(error));
    }
};
