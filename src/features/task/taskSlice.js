import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = "http://localhost:8765/";

export const fetchAsyncGet = createAsyncThunk("task/get", async () => {
    const res = await axios.get(`${apiUrl}get/tasks.json`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data.tasks;
});

export const fetchAsyncCreate = createAsyncThunk("task/post", async (task) => {
    const res = await axios.post(`${apiUrl}add/tasks.json`, task, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data.task;
});

export const fetchAsyncUpdate = createAsyncThunk("task/put", async (task) => {
    const res = await axios.put(`${apiUrl}put/tasks/${task}.json`, task, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data.task;
});

export const fetchAsyncDelete = createAsyncThunk("task/delete", async (task) => {
    const res = await axios.put(`${apiUrl}delete/tasks/${task}.json`, task, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data.task.id;
});

const initialState = {
    tasks: [
        {
            id: 0,
            title: "",
            created: "",
            modified: "",
        },
    ],
    createdTask: {
        title: "",
        deleted: 0,
    },
    editedTask: {
        id: 0,
        title: "",
    },
    selectedTask: {
        id: 0,
        title: "",
    },
    deletedTask: {
        id: 0,
    }
};

const taslSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        createTask(state, action) {
            state.createdTask = action.payload;
        },
        editTask(state, action) {
            state.editedTask = action.payload;
        },
        selectTask(state, action) {
            state.selectedTask = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
            return {
                ...state,
                tasks: action.payload,
            };
        });
        builder.addCase(fetchAsyncCreate.fulfilled, (state, action) => {
            return {
                ...state,
                tasks: [action.payload, ...state.tasks],
            };
        });
        builder.addCase(fetchAsyncUpdate.fulfilled, (state, action) => {
            return {
                ...state,
                tasks: state.tasks.map((t) =>
                    t.id !== action.payload.id ? action.payload : t
                ),
                selectedTask: action.payload,
            };
        });
        builder.addCase(fetchAsyncDelete.fulfilled, (state, action) => {
            return {
                ...state,
                tasks: state.tasks.filter((t) => t.id !== action.payload),
                deletedTask: {
                    id: 0,
                },
            };
        });
    },
});

export const { createTask, editTask, selectTask } = taslSlice.actions;

export const selectSelectedTask = (state) => state.task.selectedTask;
export const selectCreatedTask = (state) => state.task.createdTask;
export const selectEditedTask = (state) => state.task.editedTask;
export const selectTasks = (state) => state.task.tasks;

export default taslSlice.reducer;