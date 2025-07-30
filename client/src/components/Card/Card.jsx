import React, { useState } from 'react';
import Edit from '../Edit';
import toast from 'react-hot-toast';
import axios from 'axios';

const Card = ({ alltodos, getTodoAll}) => {
  const [showmodel, setshowmodel] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); // 👈 this will hold the current task

  const handleEdit = (task) => {
    setSelectedTask(task); // set the clicked task
    setshowmodel(true);
  };
  

const handledelete = async (id) => {
  try {
    const userData = JSON.parse(localStorage.getItem("todoapp"));

    if (!userData || !userData.token) {
      toast.error("User not authenticated");
      return;
    }

    // Set Authorization header once per request
    await axios.delete(`http://localhost:8080/api/v1/todo/Delete/${id}`, {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    });

    toast.success("Task Deleted Successfully!");

    // Fetch updated list after deletion
    await getTodoAll();

  } catch (err) {
    toast.error("Error deleting task");
    console.error("Delete error:", err);
  }
};



  

  return (
    <div className="pt-[50px] pl-[70px] flex flex-wrap gap-4">
      {alltodos?.map((task, i) => (
        <div
          key={i}
          className="w-64 p-4 border rounded shadow bg-white flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-2">
            <h6 className="font-semibold text-lg">
              {task?.title?.substring(0, 15)}
            </h6>
            <h6
              className={
                task?.isCompleted
                  ? 'text-green-600 font-medium'
                  : 'text-red-500 font-medium'
              }
            >
              {task?.isCompleted ? 'Completed' : 'Incomplete'}
            </h6>
          </div>

          <div className="text-sm mb-2">
            <h6 className="font-medium">{task?.title}</h6>
            <p className="text-gray-700">{task?.description}</p>
            <p className="text-gray-500 mt-2 text-xs">
              Date: {task?.createdAt?.substring(0, 10)}
            </p>
          </div>

          <div className="flex justify-end gap-2 mt-auto">
            <button
              className="flex items-center gap-1 px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => handleEdit(task)}
            >
              <i className="fa-solid fa-pen-to-square"></i> Edit
            </button>
            <button className="flex items-center gap-1 px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600" onClick={()=>handledelete(task?._id)}>
              <i className="fa-solid fa-trash"></i> Delete
            </button>
          </div>
        </div>
      ))}

      {/* Render modal outside of map */}
      {showmodel && (
        <Edit task={selectedTask} setshowmodel={setshowmodel} getTodoAll={getTodoAll}/>
      )}
    </div>
  );
};

export default Card;

