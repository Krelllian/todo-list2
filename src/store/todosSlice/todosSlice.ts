import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface ITodo {
    id: string;
    text: string;
    completed: boolean;
}

export interface ITodosState {
    todosList: ITodo[];
}

const initialState: ITodosState = {
    todosList: [],
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<string>) {
            state.todosList.push({
                id: uuidv4(),
                text: action.payload,
                completed: false,
            })
        },
        toggleCompleted(state, action: PayloadAction<string>) {
            const toggleToDo = state.todosList.find(todo => todo.id === action.payload)
            if (toggleToDo) {
                toggleToDo.completed = !toggleToDo.completed
            }
        },
        removeCompletedToDos(state) {
            const filteredState = state.todosList.filter(todo => todo.completed === false)
            state.todosList = filteredState
        }
    },
});

export const { addTodo, toggleCompleted, removeCompletedToDos } = todoSlice.actions;

export default todoSlice.reducer;
