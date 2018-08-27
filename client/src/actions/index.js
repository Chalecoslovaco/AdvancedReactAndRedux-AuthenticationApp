import axios from 'axios';

import { AUTH_USER, AUTH_ERROR } from './types';

export const signup = (formProps, callback) => dispatch => {
    axios.post('http://localhost:3090/signup', formProps)
        .then(res => {
            dispatch({ type: AUTH_USER, payload: res.data.token });
            callback();
        })
        .catch(e => {
            console.log(e);
            dispatch({ type: AUTH_ERROR, payload: 'Email already in use' });
        });
};