import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './TaskInputs.module.css';
import {
    fetchAsyncCreate,
    fetchAsyncUpdate,
    editTask,
    selectEditedTask,
} from './taskSlice';

const TaskInputs = () => {
    const dispatch = useDispatch();
    const editedTask = useSelector(selectEditedTask);
    const isDisabled = editedTask.title.length === 0;

    const handleInputChange = (e) => {
        editedTask.id === 0
            ? dispatch(editTask({id: 0, title: e.target.value}))
            : dispatch(editTask({id: editedTask.id, title: e.target.value}));
    };

    const createClicked = () => {
        dispatch(fetchAsyncCreate(editedTask));
        dispatch(editTask({id: 0, title: ""}));
    };

    const updateClicked = () => {
        dispatch(fetchAsyncUpdate(editedTask));
        dispatch(editTask({id: 0, title: ""}));
    };

    return (
        <div>
            <input
                type="text"
                className={styles.taskInput}
                value={editedTask.title}
                onChange={handleInputChange}
                placeholder="Please Input Task"
            />
            <div className={styles.switch}>
                {editedTask.id === 0 ? (
                    <button
                        disabled={isDisabled}
                        onClick={createClicked}
                    >
                        Create
                    </button>
                ) : (
                    <button
                        disabled={isDisabled}
                        onClick={updateClicked}
                    >
                        Update
                    </button>
                )}
            </div>
        </div>
    );
};

export default TaskInputs;