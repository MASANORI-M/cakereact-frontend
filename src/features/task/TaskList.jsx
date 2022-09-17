import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './TaskList.module.css';
import { fetchAsyncGet, selectTasks } from './taskSlice';
import TaskItem from './TaskItem';

const TaskList = () => {
    const tasks = useSelector(selectTasks);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchTaskGet = async() => {
            await dispatch(fetchAsyncGet());
        };
        fetchTaskGet();
    }, [dispatch]);

    return (
        <div>
            <ul className={styles.taskList}>
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;