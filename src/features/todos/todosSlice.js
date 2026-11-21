import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../../api/todoApi";

// Fetch all todos
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, thunkAPI) => {
    try {
      return await getTodos();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch todos"
      );
    }
  }
);

// Add a todo
export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (todo, thunkAPI) => {
    try {
      return await createTodo(todo);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add todo"
      );
    }
  }
);

// Update a todo
export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async ({ id, todo }, thunkAPI) => {
    try {
      return await updateTodo(id, todo);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update todo"
      );
    }
  }
);

// Delete a todo
export const removeTodo = createAsyncThunk(
  "todos/removeTodo",
  async (id, thunkAPI) => {
    try {
      await deleteTodo(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete todo"
      );
    }
  }
);

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add todo
      .addCase(addTodo.pending, (state) => {
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Edit todo
      .addCase(editTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );

        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete todo
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (todo) => todo.id !== action.payload
        );
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError } = todosSlice.actions;

export default todosSlice.reducer;