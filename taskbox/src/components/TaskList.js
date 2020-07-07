import React from 'react';
import Task from './Task';

function TaskList ({ loading, tasks, onPinTask, onArchiveTask}){
    const events = {
        onPinTask,
        onArchiveTask,
    };

    const LoadingRow = (
        <div className = "loading-item">
            <span className = "glow-checkbox" />
            <span className="glow-text">
                <span>Loading</span> <span>cool</span> <span>state</span>
            </span>
        </div>
    );

    if (loading) {
        return (
        <div className="list-items">
            {LoadingRow}
            {LoadingRow}
            {LoadingRow}
            {LoadingRow}
            {LoadingRow}
            {LoadingRow}
        </div>
        );
    }

    if (tasks.length === 0) {
        return <div className="list-items">empty</div>
    }

    return(
        <div className="list-items">
            {tasks.map(task => (
                <Task key={task.id} task={task} {...events} />
            ))}
        </div>
    );
}

export default TaskList;