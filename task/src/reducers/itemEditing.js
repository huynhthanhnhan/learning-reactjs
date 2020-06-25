import * as types from '../constants/ActionTypes';

var initState = {
    id: '',
    name: '',
    status: false
};

export const itemEditing = (state = initState, action) => {
    switch (action.type) {
        case types.EDIT_TASK:
            return action.task;
        default:
            return state;
    }
}

export default itemEditing;