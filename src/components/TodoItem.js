import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTodo, deleteTodo, toggleTodoComplete } from "../redux/actions/todoActions";

const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState(todo.task);
  const [editDeadline, setEditDeadline] = useState(
    todo.deadline ? new Date(todo.deadline).toISOString().split("T")[0] : ""
  );
  const [editPriority, setEditPriority] = useState(todo.priority || "medium");
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useDispatch();

  const handleToggleComplete = async () => {
    try {
      await dispatch(toggleTodoComplete(todo._id, !todo.completed)).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    if (!editTask.trim()) return;
    setIsUpdating(true);
    try {
      await dispatch(
        updateTodo(todo._id, {
          task: editTask.trim(),
          deadline: editDeadline || null,
          priority: editPriority,
          completed: todo.completed,
        })
      ).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return;
    try {
      await dispatch(deleteTodo(todo._id)).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-50";
      case "medium": return "text-yellow-600 bg-yellow-50";
      case "low": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const isOverdue = todo.deadline && new Date(todo.deadline) <= new Date() && !todo.completed;

  return (
    <div className={`p-4 hover:bg-gray-50 ${todo.completed ? "opacity-75" : ""} ${isOverdue ? "bg-red-50" : ""}`}>
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editTask}
            onChange={(e) => setEditTask(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            disabled={isUpdating}
          />
          <div className="flex gap-3">
            <input
              type="date"
              value={editDeadline}
              onChange={(e) => setEditDeadline(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg"
              disabled={isUpdating}
            />
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg"
              disabled={isUpdating}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              disabled={!editTask.trim() || isUpdating}
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              disabled={isUpdating}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggleComplete}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className={`${todo.completed ? "line-through text-gray-500" : isOverdue ? "text-red-700 font-medium" : "text-gray-800"}`}>
                  {todo.task}
                </p>
                <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(todo.priority)}`}>
                  {todo.priority || "medium"}
                </span>
                {isOverdue && (
                  <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                    Overdue
                  </span>
                )}
              </div>
              {todo.deadline && (
                <p className={`text-sm ${isOverdue ? "text-red-600" : "text-gray-500"}`}>
                  Due: {new Date(todo.deadline).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
          <div className="flex space-x-2 ml-4">
            <button onClick={() => setIsEditing(true)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg">Edit</button>
            <button onClick={handleDelete} className="p-2 text-red-600 hover:bg-red-100 rounded-lg">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
