import * as types from '../constants/ActionTypes';

var initState = {
    name: '',
    status: -1
};

export const filter = (state = initState, action) => {
    switch (action.type) {
        case types.FILTER_TABLE:
            return {
                name: action.filter.name,
                status: parseInt(action.filter.status, 10)
            };
        default:
            return state;
    }
}

export default filter;