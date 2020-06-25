import * as types from '../constants/ActionTypes';

var s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

var guid = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var findIndex = (tasks, id) => {
    var result = -1;
    tasks.forEach((task, index) => {
        if (task.id === id) {
            result = index;
        }
    });
    return result;
}

var data = JSON.parse(localStorage.getItem('tasks'));

var initState = data ? data : [];

export const tasks = (state = initState, action) => {
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.ADD_TASK:
            var newTask = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status === "true" ? true : false
            };
            if (!newTask.id) {
                newTask.id = guid();
                state.push(newTask);
            }
            else{
                var index = findIndex(state, newTask.id);
                state[index] = newTask;
            }

            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.UPDATE_STATUS:
            index = findIndex(state, action.id);
            // state[index].status = !state[index].status;  // fail
            state[index] = {
                ...state[index], // clone phan tu state [index]
                status: !state[index].status // voi gia tri status duoc cap nhat
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.DELETE_TASK:
            index = findIndex(state, action.id);
            state.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        default:
            return state;
    }
}

export default tasks;