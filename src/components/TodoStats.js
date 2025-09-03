import React from 'react';
import { useSelector } from 'react-redux';

const TodoStats = () => {
  const { items } = useSelector((state) => state.todoState);
  const total = items.length;
  const completed = items.filter((t) => t.completed).length;
  const active = total - completed;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex justify-around">
      <div className="text-center">
        <p className="text-2xl font-bold">{total}</p>
        <p className="text-sm text-gray-500">Total</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-green-600">{completed}</p>
        <p className="text-sm text-gray-500">Completed</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-blue-600">{active}</p>
        <p className="text-sm text-gray-500">Active</p>
      </div>
    </div>
  );
};

export default TodoStats;
