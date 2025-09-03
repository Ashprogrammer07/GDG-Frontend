// Action type constants for better maintainability
export const TODO_ACTION_TYPES = {
  FETCH_TODOS: 'todos/fetchTodos',
  ADD_TODO: 'todos/addTodo',
  UPDATE_TODO: 'todos/updateTodo',
  DELETE_TODO: 'todos/deleteTodo',
  TOGGLE_TODO_COMPLETE: 'todos/toggleTodoComplete',
  SET_LOADING: 'todos/setLoading',
  SET_ERROR: 'todos/setError',
  CLEAR_ERROR: 'todos/clearError',
  FILTER_TODOS: 'todos/filterTodos',
  SORT_TODOS: 'todos/sortTodos',
};

// Filter types
export const FILTER_TYPES = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  OVERDUE: 'overdue',
};

// Sort types
export const SORT_TYPES = {
  CREATED_ASC: 'created_asc',
  CREATED_DESC: 'created_desc',
  DEADLINE_ASC: 'deadline_asc',
  DEADLINE_DESC: 'deadline_desc',
  ALPHABETICAL: 'alphabetical',
};
