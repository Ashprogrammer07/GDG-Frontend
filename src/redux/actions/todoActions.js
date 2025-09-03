import axios from "axios";
import {
  addTodoFailure,
  addtodoStart,
  addTodoSuccess,
  deleteTodoFailure,
  deleteTodoStart,
  deleteTodoSuccess,
  fetchTodosFailure,
  fetchTodosStart,
  fetchTodosSuccess,
  updateTodoFailure,
  updateTodoStart,
  updateTodoSuccess,
} from "../slices/todoSlice";

const API_URL = process.env.REACT_APP_API;

export const addTodo = (todo) => async (dispatch) => {
  try {
    dispatch(addtodoStart());
    const { data } = await axios.post(`${API_URL}/api/todos/addtodo`, todo);
    dispatch(addTodoSuccess(data));
  } catch (err) {
    dispatch(addTodoFailure(err?.response?.data?.message || err.message));
  }
};

export const getTodos = () => async (dispatch) => {
  try {
    dispatch(fetchTodosStart());
    const { data } = await axios.get(`${API_URL}/api/todos/gettodos`);
    dispatch(fetchTodosSuccess(data));
  } catch (err) {
    dispatch(fetchTodosFailure(err?.response?.data?.message || err.message));
  }
};

export const updateTodo = (id, updates) => async (dispatch) => {
  try {
    dispatch(updateTodoStart());
    const { data } = await axios.put(`${API_URL}/api/todos/updatetodo/${id}`, updates);
    dispatch(updateTodoSuccess(data));
  } catch (err) {
    dispatch(updateTodoFailure(err?.response?.data?.error || err.message));
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    dispatch(deleteTodoStart());
    await axios.delete(`${API_URL}/api/todos/deletetodo/${id}`);
    dispatch(deleteTodoSuccess(id));
  } catch (err) {
    dispatch(deleteTodoFailure(err?.response?.data?.message || err.message));
  }
};

export const toggleTodoComplete = (id, completed) => async (dispatch) => {
  try {
    dispatch(updateTodoStart());
    const { data } = await axios.put(`${API_URL}/api/todos/toggle/${id}`, { completed });
    dispatch(updateTodoSuccess(data));
  } catch (err) {
    dispatch(updateTodoFailure(err?.response?.data?.message || err.message));
  }
};

export const addMultipleTodos = (todos) => async (dispatch) => {
  try {
    dispatch(addtodoStart());
    const responses = await Promise.all(
      todos.map((todo) => axios.post(`${API_URL}/api/todos/addtodo`, todo))
    );
    const newTodos = responses.map((res) => res.data);
    dispatch(fetchTodosSuccess(newTodos));
  } catch (err) {
    dispatch(addTodoFailure(err?.response?.data?.message || err.message));
  }
};

export const deleteMultipleTodos = (ids) => async (dispatch) => {
  try {
    dispatch(deleteTodoStart());
    await Promise.all(ids.map((id) => axios.delete(`${API_URL}/api/todos/deletetodo/${id}`)));
    dispatch(deleteTodoSuccess(ids));
  } catch (err) {
    dispatch(deleteTodoFailure(err?.response?.data?.message || err.message));
  }
};

export const markAllComplete = () => async (dispatch) => {
  try {
    dispatch(updateTodoStart());
    const { data } = await axios.put(`${API_URL}/api/todos/toggleAll`, { completed: true });
    dispatch(fetchTodosSuccess(data));
  } catch (err) {
    dispatch(updateTodoFailure(err?.response?.data?.message || err.message));
  }
};

export const clearCompleted = () => async (dispatch, getState) => {
  try {
    dispatch(deleteTodoStart());
    const { todoState } = getState();
    const completed = todoState.items
      .filter((t) => t.completed)
      .map((t) => t._id?.toString())
      .filter(Boolean);

    if (completed.length === 0) return;

    await Promise.all(
      completed.map((id) => axios.delete(`${API_URL}/api/todos/deletetodo/${id}`))
    );

    // fetch updated todos after deletion
    const { data } = await axios.get(`${API_URL}/api/todos/gettodos`);
    dispatch(fetchTodosSuccess(data));
  } catch (err) {
    dispatch(deleteTodoFailure(err?.response?.data?.message || err.message));
  }
};
