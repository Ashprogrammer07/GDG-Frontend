import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/actions/todoActions";
import { toast } from "react-toastify";

const AddTodo = () => {
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (task.trim()) {
      setIsSubmitting(true);
      try {
        await dispatch(
          addTodo({
            task: task.trim(),
            deadline: deadline || null,
            priority,
            completed: false,
          })
        ).unwrap();
        setTask("");
        setDeadline("");
        setPriority("medium");
      } catch (err) {
        toast(err.message || "Failed to add todo", { type: "error", position: "top-right" });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Todo</h2>
      <form onSubmit={onSubmitHandler} className="space-y-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
          className="border rounded px-3 py-2 w-full"
          disabled={isSubmitting}
        />
        <div className="flex gap-4">
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="flex-1 px-3 py-2 border rounded-lg"
            disabled={isSubmitting}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg"
            disabled={isSubmitting}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={!task.trim() || isSubmitting}
          className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {isSubmitting ? "Adding..." : "Add Todo"}
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
