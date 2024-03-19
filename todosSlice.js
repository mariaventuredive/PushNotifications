// todosSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
 
  return data;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      });
  },
});

export default todosSlice.reducer;
