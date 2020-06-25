import {combineReducers} from 'redux';
import {tasks} from './task';
import {isDisplayForm} from './isDisplayForm';
import {itemEditing} from './itemEditing';
import {filter} from './filterTable';

var myReducer = combineReducers({
    tasks,
    isDisplayForm,
    itemEditing,
    filter
});

export default myReducer;