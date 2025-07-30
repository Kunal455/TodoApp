import React from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const PopModel = ({ showmodel, setshowmodel, title, settitle, description, setdescription, getTodoAll }) => {

  //handle close

  const CloseModelHandle = () => {
    setshowmodel(false)
  }

  const handleSubmit = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("todoapp"))
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
      const id = userData && userData.user.id
      if (!title || !description) {
        return toast.error("Provide title or Description")
      }


      await axios.post("http://localhost:8080/api/v1/todo/create", {
        title,
        description,
        createdby: id
      }, {
        headers: {
          Authorization: `Bearer ${userData.token}`
        }
      });





      setshowmodel(false)
      toast.success("Task created Successfully")
      settitle("")
      setdescription("")
      getTodoAll()


    }
    catch (err) {
      console.log(err)
      toast.error(err)
    }
  }



  return (
    <>

      {showmodel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-blue-600 text-white p-8 rounded-lg w-[500px]">
            <h5 className="text-xl font-bold mb-4">Add New Task</h5>
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
                Create
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default PopModel