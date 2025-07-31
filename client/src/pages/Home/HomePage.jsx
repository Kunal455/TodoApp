import React from 'react'
import Navbar from '../../components/Layout/Navbar'
import './Home.css'
import PopModel from '../../components/PopModel'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../../components/Card/Card'
import Spinner from '../../components/Spinner'
import { useNavigate } from 'react-router-dom'  




const HomePage = () => {
  const [showmodel, setshowmodel] = useState("")
  const [title, settitle] = useState("")
  const [description, setdescription] = useState("")
  const [alltodos, setalltodos] = useState([])
  const [loading, setloading] = useState(true)
  const [searchquery, setsearchquery] = useState('')
  const navigate = useNavigate()

  const OpenModelHandle=() => {
    setshowmodel(true)
  }

  useEffect(() => {
  const userData = JSON.parse(localStorage.getItem("todoapp"));
  if (!userData || !userData.token) {
    navigate("/login");  // auto-redirect if not logged in
  }
}, []);
  
  
  
  const getTodoAll = async () => {
    try {
      setloading(true)
      const userData = JSON.parse(localStorage.getItem('todoapp'))
      const id = userData?.user?.id;
      const token = userData?.token;

      if (!token || !id) {
        console.log("Missing token or user ID");
        return;
      }
      
      const userdata = await axios.post(
        `https://todoapp-ud7u.onrender.com/api/v1/todo/getAll/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     
      setalltodos(userdata.data.todos)
      console.log(userdata)
    } catch (err) {
      setloading(false)
      console.error("Error fetching todos:", err);
    }
    finally{
      setloading(false)
    }
  };
  

useEffect(() => {
  getTodoAll();
}, []);

const handlesearch = (e) => {
  const query = e.target.value
  let filtered = alltodos?.filter(item => item.title.toLowerCase().match(query.toLowerCase()))
  setsearchquery(query)

  if(query && filtered.length>0){
    setalltodos(filtered && filtered)
  }
  else{
    getTodoAll()
  }
}


  
   return (
    <>
    <Navbar />
    
    <div className="container">
      
      <div className="add-task "> 
        <h1>Your Task</h1>
        <input type="search" placeholder='search your task'  value={searchquery} onChange={handlesearch}/>
        <button className='btn5' onClick={OpenModelHandle}>Create Task&nbsp;<i className="fa-solid fa-plus"></i></button>
      </div>
    </div>
    
    {loading ? (
  <Spinner />
) : alltodos.length === 0? (
  <div className="text-center text-gray-500 mt-10 text-xl">🎉 No tasks available</div>
) : (
  <Card alltodos={alltodos} getTodoAll={getTodoAll} />
)}

    
    <PopModel
    showmodel={showmodel}
    setshowmodel={setshowmodel}
    title={title}
    settitle={settitle}
    description={description}
    setdescription={setdescription}
    getTodoAll={getTodoAll}
  
     />
    </>
    
  )
}



export default HomePage