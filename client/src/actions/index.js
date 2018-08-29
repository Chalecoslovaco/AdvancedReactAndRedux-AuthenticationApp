import axios from 'axios';

import { AUTH_USER, AUTH_ERROR } from './types';

export const sign = (formProps, signType, callback) => dispatch => {
    axios.post(`http://localhost:3090/${signType}`, formProps)
        .then(res => {
            dispatch({ type: AUTH_USER, payload: res.data.token });
            localStorage.setItem('token', res.data.token);
            callback();
        })
        .catch(e => {
            console.log(e);
            if(signType === 'signin')
                dispatch({ type: AUTH_ERROR, payload: 'Invalid email or password' });
            else if (signType === 'signup')
                dispatch({ type: AUTH_ERROR, payload: 'Email already in use' });
        });
};

export const signout = () => {
    localStorage.removeItem('token');

    return {
        type: AUTH_USER,
        payload: ''
    }
}