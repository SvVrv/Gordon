
import { SET_CURRENT_USER, DISPOSE_CURRENT_USER } from '../actions/authActions';

import isEmpty from 'lodash/isEmpty';

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: !isEmpty(action.user),
                user: action.user
            };
        case DISPOSE_CURRENT_USER:
            return {
                isAuthenticated: false,
                user: {}
            };
        default: return state;
    }

}    

