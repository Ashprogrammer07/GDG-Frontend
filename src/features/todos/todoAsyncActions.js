import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API}/api/todos`;

export const toggleTodoComplete = createAsyncThunk(
  'todos/toggleTodoComplete',
  async (todoId, { getState, rejectWithValue }) => {
    try {
      const { todos } = getState();
      const todo = todos.items.find((t) => t._id === todoId);
      if (!todo) throw new Error('Todo not found');

      const response = await axios.put(`${API_URL}api/todos/toggle/${todoId}`, {
        ...todo,
        completed: !todo.completed,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to toggle todo completion');
    }
  }
);

export const addMultipleTodos = createAsyncThunk(
  'todos/addMultipleTodos',
  async (todosArray, { rejectWithValue }) => {
    try {
      const promises = todosArray.map((todo) => axios.post(`${API_URL}/api/todos/addtodo`, todo));
      const results = await Promise.all(promises);
      return results.map((res) => res.data);
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to add multiple todos');
    }
  }
);

export const deleteMultipleTodos = createAsyncThunk(
  'todos/deleteMultipleTodos',
  async (todoIds, { rejectWithValue }) => {
    try {
      const promises = todoIds.map((id) => axios.delete(`${API_URL}/api/todos/deletetodo/${id}`));
      await Promise.all(promises);
      return todoIds;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to delete multiple todos');
    }
  }
);

export const markAllComplete = createAsyncThunk(
  'todos/markAllComplete',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/api/todos/toggleall`, { completed: true });
      return response.data; // backend returns { message, result }
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to mark all todos as complete');
    }
  }
);

export const clearCompleted = createAsyncThunk(
  'todos/clearCompleted',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { todos } = getState();
      const completedTodos = todos.items.filter((todo) => todo.completed);
      const todoIds = completedTodos.map((todo) => todo._id);

      const promises = todoIds.map((id) => axios.delete(`${API_URL}/api/todos/deletetodo/${id}`));
      await Promise.all(promises);
      return todoIds;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Failed to clear completed todos');
    }
  }
);
