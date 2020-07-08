// container components

import { createStore } from 'redux';
import { taggedTemplateExpression } from '@babel/types';

//"names" of the changes that can happen to the store
export const actions = {
    ARCHIVE_TASK: 'ARCHIVE_TASK',
    PIN_TASK: 'PIN_TASK',
};

// The action creators bundle actions with the data required to execute them
export const archiveTask = id => ({ type: actions.ARCHIVE_TASK, id });
export const pinTask = id => ({ type: actions.PIN_TASK, id });

// All the reducers simple change the state of a single task.
function taskStateReducer(taskState) {
    return (state, action) => {
        return {
            ...state,
            tasks: state.tasks.map(task => 
                task.id === action.id ? { ...task, state: taskState } : task
            ),
            
            // Question: is above arrow function equal to:   -- ?????

            /*
                tasks: state.tasks.map(function (task) {
                    if(task.id === action.id){
                        return { ...task, state: taskState}
                    };
                    return task
                }),
            */

        };
    };
}
// The reducer describes how the contents of the store change for each action
export const reducer = (state, action) => {
    switch (action.type){
        case actions.ARCHIVE_TASK:
            return taskStateReducer('TASK_ARCHIVED')(state, action);
        case actions.PIN_TASK:
            return taskStateReducer('TASK_PINNED')(state, action);
        defaul:
            return state;
    }
};

//initial state of the store when the app loads. usually would fetch this from a server
const defaultTasks = [
    { id:'1', title:'Something', state:'TASK_INBOX' },
    { id:'2', title:'Something more', state:'TASK_INBOX' },
    { id:'3', title:'Something else', state:'TASK_INBOX' },
    { id:'4', title:'Something again', state:'TASK_INBOX' },
];

//export the constructed redux store
export default createStore(reducer, { tasks: defaultTasks });