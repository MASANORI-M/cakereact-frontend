import React from 'react';

import TaskList from './features/task/TaskList';
import TaskDetails from './features/task/TaskDetails';
import TaskInputs from './features/task/TaskInputs';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.containerTasks}>
      <div className={styles.appTasks}>
        <TaskInputs />
        <TaskList />
      </div>
      <div className={styles.appDetails}>
        <TaskDetails />
      </div>
    </div>
  );
}

export default App;
