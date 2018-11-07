import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../utils/setAuthToken';

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register user
export const registerUser = (userData, history) => {
    return (dispatch) => {
        axios.post('/api/users/register', userData)
            .then(res => {
                history.push('/login')
            })
            .catch(err => dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            );
    }
};

// Login - Get User Token
export const loginUser = (userData) => {
    return (dispatch) => {
        axios.post('/api/users/login', userData)
            .then(res => {
                // Save to localStorage
                const { token } = res.data;

                // Set token to ls
                localStorage.setItem('jwtToken', token);

                // Set token to auth header
                setAuthToken(token);

                // Decode token to get user data
                const decoded =  jwt_decode(token);

                // Set current user
                dispatch(setCurrentUser(decoded));

            })
            .catch(err => dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            );
    }
};

// Set logged in user
export const setCurrentUser = (decodedUser) => {
    return {
        type: SET_CURRENT_USER,
        payload: decodedUser
    }
};

// Logout user
export const logoutUser = () => {
    return (dispatch) => {
        // remove Token from localStorage
        localStorage.removeItem('jwtToken');
        // remove auth token for future requests
        setAuthToken(false) // Por passar false, o token ira ser removido das requests
        // set current user to {} which will set isAuthenticated to false
        dispatch(setCurrentUser({}));
    }
};
