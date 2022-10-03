import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './TaskInputs.module.css';
import {
    fetchAsyncCreate,
    fetchAsyncUpdate,
    createTask,
    editTask,
    selectEditedTask,
    selectCreatedTask,
} from './taskSlice';

const TaskInputs = () => {
    const dispatch = useDispatch();
    const createdTask = useSelector(selectCreatedTask);
    const editedTask = useSelector(selectEditedTask);
    const createdIsDisabled = createdTask.title.length === 0;
    const editIsDisabled = editedTask.title.length === 0;

    const handleInputChange = (e) => {
        editedTask.id === 0
            // ? dispatch(editTask({id: 0, title: e.target.value}))
            ? dispatch(createTask({title: e.target.value, deleted:0}))
            : dispatch(editTask({id: editedTask.id, title: e.target.value}));
    };

    const createClicked = () => {
        dispatch(fetchAsyncCreate(createdTask));
        // dispatch(editTask({id: 0, title: ""}));
        dispatch(createTask({title: "", deleted: 0}));
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
                value={editedTask.id === 0 ? createdTask.title : editedTask.title}
                onChange={handleInputChange}
                placeholder="Please Input Task"
            />
            <div className={styles.switch}>
                {editedTask.id === 0 ? (
                    <button
                        disabled={createdIsDisabled}
                        onClick={createClicked}
                    >
                        Create
                    </button>
                ) : (
                    <button
                        disabled={editIsDisabled}
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