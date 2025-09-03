import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { markAllComplete, clearCompleted } from "../redux/actions/todoActions";
import TodoItem from "./TodoItem";
import { FILTER_TYPES, SORT_TYPES } from "../features/todos/todoActionTypes";

const TodoList = () => {
  const dispatch = useDispatch();
  const { items, filter, sortBy, searchQuery } = useSelector((state) => state.todoState);

  const filteredAndSortedTodos = useMemo(() => {
    let filtered = items;

    if (searchQuery) {
      filtered = filtered.filter(todo =>
        todo.task?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filter) {
      case FILTER_TYPES.ACTIVE:
        filtered = filtered.filter(todo => !todo.completed);
        break;
      case FILTER_TYPES.COMPLETED:
        filtered = filtered.filter(todo => todo.completed);
        break;
      case FILTER_TYPES.OVERDUE:
        filtered = filtered.filter(todo => {
          if (!todo.deadline) return false;
          const deadline = new Date(todo.deadline);
          return deadline < new Date() && !todo.completed;
        });
        break;
      default:
        break;
    }

    switch (sortBy) {
      case SORT_TYPES.CREATED_ASC:
        return [...filtered].sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
      case SORT_TYPES.CREATED_DESC:
        return [...filtered].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      case SORT_TYPES.DEADLINE_ASC:
        return [...filtered].sort((a, b) => {
          if (!a.deadline && !b.deadline) return 0;
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return new Date(a.deadline) - new Date(b.deadline);
        });
      case SORT_TYPES.DEADLINE_DESC:
        return [...filtered].sort((a, b) => {
          if (!a.deadline && !b.deadline) return 0;
          if (!a.deadline) return -1;
          if (!b.deadline) return 1;
          return new Date(b.deadline) - new Date(a.deadline);
        });
      case SORT_TYPES.ALPHABETICAL:
        return [...filtered].sort((a, b) => (a.task || "").localeCompare(b.task || ""));
      default:
        return filtered;
    }
  }, [items, filter, sortBy, searchQuery]);

  const handleMarkAllComplete = () => dispatch(markAllComplete());
  const handleClearCompleted = () => dispatch(clearCompleted());

  const hasActiveTodos = items.some(todo => !todo.completed);
  const hasCompletedTodos = items.some(todo => todo.completed);

  if (items.length === 0) return <div className="text-center p-8 text-gray-500">No todos yet</div>;
  if (filteredAndSortedTodos.length === 0) return <div className="text-center p-8 text-gray-500">No todos found</div>;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {items.length > 0 && (
        <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
          <button onClick={handleMarkAllComplete} disabled={!hasActiveTodos} className="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400">
            Mark all complete
          </button>
          <button onClick={handleClearCompleted} disabled={!hasCompletedTodos} className="text-sm text-red-600 hover:text-red-800 disabled:text-gray-400">
            Clear completed
          </button>
        </div>
      )}
      <div className="divide-y divide-gray-200">
        {filteredAndSortedTodos.map((todo, index) => (
          <TodoItem key={todo._id} todo={todo} index={index} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
