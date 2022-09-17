import React from 'react';
import { useSelector } from 'react-redux';

import { selectSelectedTask } from './taskSlice';
import styles from './TaskDetails.module.css';

const TaskDetails = () => {
    const selectedTask = useSelector(selectSelectedTask);
    console.log(selectedTask);

    return (
        <div className={styles.details}>
            {selectedTask.title && (
                <>
                    <h2>{selectedTask.id} {selectedTask.title}</h2>
                    <p>Created at</p>
                    <h3>{selectedTask.created}</h3>
                    <p>Updated at</p>
                    <h3>{selectedTask.modified}</h3>
                </>
            )}
        </div>
    );
};

export default TaskDetails;