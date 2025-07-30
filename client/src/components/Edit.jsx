import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Edit = ({task, setshowmodel, getTodoAll}) => {

    const [title, settitle] = useState(task?.title)
    const [description, setdescription] = useState(task?.description)
    const [isCompleted, setisCompleted] = useState(task?.isCompleted)

    const CloseModelHandle = () =>{
        setshowmodel(false)
    }

    const handleselectchange = (e) => {
        const value = e.target.value === "true"; // converts string "true"/"false" to boolean
        setisCompleted(value);
        
    }

      const id = task?._id
    const handleSubmit = async () => {
        try{
        const userData = JSON.parse(localStorage.getItem("todoapp"))
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
        const createdby = userData && userData.user.id
        if(!title || !description){
            return toast.error("Provide title or Description")
        }

      
       await axios.patch("http://localhost:8080/api/v1/todo/Update/" + id, {
        title,
        description,
        createdby,
        isCompleted
        }, {
        headers: {
         Authorization: `Bearer ${userData.token}`
            }
        });

        



        setshowmodel(false)
        toast.success("Task Updated Successfully")
        settitle("")
        setdescription("")
        getTodoAll()
    }
    catch(err){
        console.log(err)
        toast.error(err)
    }
    }
    

  return (
    <div>
      {task && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-blue-600 text-white p-8 rounded-lg w-[500px]">
      <h5 className="text-xl font-bold mb-4">Update Your Task</h5>
      <div className="mb-4">
        <label className="block mb-1">Title</label>
        <input
          type="text"
          className="w-full p-2 rounded text-black"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Description</label>
        <textarea
          className="w-full p-2 rounded text-black"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
      </div>
      <div>
        <select className="text-black" value={isCompleted} onChange={handleselectchange}>
        <option value="">Select Status</option>
        <option value="true">Completed</option>
        <option value="false">InCompleted</option>
        </select>

      </div>
      <div className="flex justify-end gap-4">
        <button
          className="bg-red-600 px-4 py-2 rounded"
          onClick={CloseModelHandle}
        >
          Close
        </button>
        <button
          className="bg-blue-700 px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          Update
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  )
}

export default Edit
