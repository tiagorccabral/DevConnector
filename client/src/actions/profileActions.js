import axios from 'axios';

import {GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER} from "./types";

// Get current profile
export const getCurrentProfile = () => {
    return (dispatch) => {
        dispatch(setProfileLoading());
        axios.get('/api/profile')
            .then(res => {
                dispatch({
                    type: GET_PROFILE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type: GET_PROFILE,
                    payload: {}
                })
            });
    }
};

// Create profile
export const createProfile = (profileData, history) => dispatch => {
    axios
        .post('/api/profile', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
};

// Clear profile
export const clearCurrentProfile = ()  => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
};

// Add education
export const addEducation = (eduData, history) => {
    return (dispatch) => {
        axios.post('/api/profile/education', eduData)
            .then(res => history.push('/dashboard'))
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                }))
    }

};

// delete experience
export const deleteEducation = (id) => {
    return (dispatch) => {
        axios.delete(`/api/profile/education/${id}`)
            .then(res => dispatch({
                type: GET_PROFILE,
                payload: res.data
            }))
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                }))
    }

};

// Add experience
export const addExperience = (expData, history) => {
    return (dispatch) => {
        axios.post('/api/profile/experience', expData)
            .then(res => history.push('/dashboard'))
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                }))
    }

};


// delete experience
export const deleteExperience = (id) => {
    return (dispatch) => {
        axios.delete(`/api/profile/experience/${id}`)
            .then(res => dispatch({
                type: GET_PROFILE,
                payload: res.data
            }))
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                }))
    }

};

// Delete account and profile
export const deleteAccount = () => {
    return (dispatch) => {
        if (window.confirm('Você tem certeza? Isto não pode ser desfeito!')) {
            axios
                .delete('/api/profile')
                .then(res => {
                    dispatch({
                        type: SET_CURRENT_USER,
                        payload: {}
                    });
                })
                .catch(err =>
                    dispatch({
                        type: GET_ERRORS,
                        payload: err.response.data
                    })
                );
        }
    }
};
