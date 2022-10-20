import React from 'react';
import { useDispatch } from 'react-redux';

import styles from "./TaskItem.module.css";
import { fetchAsyncDelete, selectTask, editTask } from './taskSlice';

const TaskItem = ({task}) => {
    const dispatch = useDispatch();

    const deleteClicked = () => {
        dispatch(fetchAsyncDelete(task.id));
    };

    return (
        <li className={styles.listItem}>
            <span className={styles.taskId}>{task.id}</span>
            <span className={styles.cursor} onClick={() => dispatch(selectTask(task))}>
                {task.title}
            </span>
            <div>
                <button className={styles.taskIcon} onClick={deleteClicked}>
                    削除
                </button>
            </div>
            <div>
                <button className={styles.taskIcon} onClick={() => dispatch(editTask(task))}>
                    編集
                </button>
            </div>
        </li>
    );
};

export default TaskItem;