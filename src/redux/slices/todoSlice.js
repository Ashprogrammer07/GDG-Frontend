import { createSlice } from "@reduxjs/toolkit";
import {
  addMultipleTodos,
  deleteMultipleTodos,
  markAllComplete,
  clearCompleted,
} from "../../features/todos/todoAsyncActions.js";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    loading: false,
    error: null,
    filter: "all",
    searchQuery: "",
    sortBy: "created_desc",   
  },
  reducers: {
    fetchTodosStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTodosSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
    },
    fetchTodosFailure: (state, action) => {
      state.loading = false;
      state.items = [];
      state.error = action.payload;
    },
    addtodoStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addTodoSuccess: (state, action) => {
      state.loading = false;
      state.items.push(action.payload);
      state.error = null;
    },
    addTodoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTodoStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTodoSuccess: (state, action) => {
      state.loading = false;
      state.items = state.items.filter((todo) => todo._id !== action.payload);
      state.error = null;
    },
    deleteTodoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTodoStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTodoSuccess: (state, action) => {
      state.loading = false;
      const updated = action.payload;
      state.items = state.items.map((todo) =>
        todo._id === updated._id ? updated : todo
      );
      state.error = null;
    },
    updateTodoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSort: (state, action) => {
      state.sortBy = action.payload;   // ✅ fixed
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMultipleTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMultipleTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(...action.payload.map((res) => res.data));
      })
      .addCase(addMultipleTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteMultipleTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMultipleTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (todo) => !action.payload.includes(todo._id)
        );
      })
      .addCase(deleteMultipleTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markAllComplete.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markAllComplete.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.map((res) => res.data);
        state.items = state.items.map((todo) => {
          const match = updated.find((u) => u._id === todo._id);
          return match ? match : todo;
        });
      })
      .addCase(markAllComplete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(clearCompleted.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCompleted.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (todo) => !action.payload.includes(todo._id)
        );
      })
      .addCase(clearCompleted.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  fetchTodosStart,
  fetchTodosSuccess,
  fetchTodosFailure,
  addtodoStart,
  addTodoSuccess,
  addTodoFailure,
  deleteTodoStart,
  deleteTodoSuccess,
  deleteTodoFailure,
  updateTodoStart,
  updateTodoSuccess,
  updateTodoFailure,
  clearError,
  setFilter,
  setSearchQuery,
  setSort,
  setLoading,
} = todoSlice.actions;

export default todoSlice.reducer;
