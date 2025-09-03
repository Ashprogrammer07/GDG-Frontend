import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter, setSort, setSearchQuery } from './../redux/slices/todoSlice';
import { FILTER_TYPES, SORT_TYPES } from '../features/todos/todoActionTypes';

const TodoFilter = () => {
  const dispatch = useDispatch();
  const { filter, sort: sortBy, searchQuery } = useSelector((state) => state.todoState);

  const filterOptions = [
    { value: FILTER_TYPES.ALL, label: 'All' },
    { value: FILTER_TYPES.ACTIVE, label: 'Active' },
    { value: FILTER_TYPES.COMPLETED, label: 'Completed' },
    { value: FILTER_TYPES.OVERDUE, label: 'Overdue' },
  ];

  const sortOptions = [
    { value: SORT_TYPES.CREATED_DESC, label: 'Newest First' },
    { value: SORT_TYPES.CREATED_ASC, label: 'Oldest First' },
    { value: SORT_TYPES.DEADLINE_ASC, label: 'Deadline (Soon)' },
    { value: SORT_TYPES.DEADLINE_DESC, label: 'Deadline (Later)' },
    { value: SORT_TYPES.ALPHABETICAL, label: 'Alphabetical' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            placeholder="Search todos..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter</label>
          <div className="flex flex-wrap gap-1">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => dispatch(setFilter(option.value))}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  filter === option.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
          <select
            value={sortBy}
            onChange={(e) => dispatch(setSort(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TodoFilter;
