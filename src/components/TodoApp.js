import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from './../redux/actions/todoActions';
import { clearError } from './../redux/slices/todoSlice';
import Header from './Header';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter';
import TodoStats from './TodoStats';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const TodoApp = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.todoState);



  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Header />
        
        {error && (
          <ErrorMessage 
            message={error} 
            onClose={handleClearError} 
          />
        )}
        
       {loading ? (
  <LoadingSpinner />
) : (
  <>
    <AddTodo />
    <TodoFilter />
    <TodoStats />
    <TodoList />
  </>
)}
</div>
    </div>
  );
};

export default TodoApp;
