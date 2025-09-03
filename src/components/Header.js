import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const { items: todos } = useSelector((state) => state.todoState);

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <header className="text-center mb-8">
      <h1 className="font-bold text-gray-800 mb-2">Todo List</h1>
      <p className="text-gray-600 mb-1">Stay Organised and Productive</p>
      
      {totalCount > 0 && (
        <div className="mt-4 inline-block bg-white rounded-full px-4 py-2 shadow-sm">
          <span className="text-sm text-gray-600">
            {completedCount} of {totalCount} completed
          </span>
          <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(completedCount / totalCount) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      )}

      <p className="mt-4 text-sm text-gray-500">
        Developed by Ashwin Kumaran Ku, Reg: 24BRS1086  
        <br />
        MERN App using Tailwind CSS
      </p>
    </header>
  );
};

export default Header;
