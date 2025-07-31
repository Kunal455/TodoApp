import React, { useState } from 'react'
import './Auth.css'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { errorMessages } from '../../utils/Messages'
import signup from '../../assets/sign.jpg'


const Register = () => {
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  

  const navigate = useNavigate();
    
   const HandleSubmit2  = async (e) => {
    e.preventDefault();
     const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
      toast.error("Please enter a valid Gmail address (must end with @gmail.com)");
      return;
    }

  try {
    const res = await axios.post('https://todoapp-ud7u.onrender.com/api/v1/user/register', {
      username,
      email,
      password
    });
      toast.success(res.data.message)
      navigate("/login"); 
      
      console.log(res.data)
   
  } catch (err) {
    toast.error(errorMessages(err))
    console.log(err);
  }
};

  
  return (

    <div>
      
    <div className='flex'>
    <div className='container'>
      <div className="form">
        <div className='icon'>
          <i className='fa-solid fa-circle-user'></i>
        </div>
      <div className='inputs'>
        <div>
          <input type="text"
          placeholder='username'
          required
          value={username}
          onChange={(e) => setusername(e.target.value)}
           />
        </div>
        <div>
          <input type='email'
          placeholder='Email'
          required
          pattern="[a-zA-Z0-9._%+-]+@gmail\.com"
          title="Email must be a Gmail address ending with @gmail.com"
          value={email}
          onChange={(e) => setemail(e.target.value)}
           />
        </div>
        <div>
          <input type="password"
          placeholder='Password' 
          required
          value={password}
          onChange={(e) => setpassword(e.target.value) }/>
        </div>
        
        <div>
          <span>already a user? please-</span><Link to='/login' className='text-orange-500 underline'>Login</Link>
        </div>
        <div>
          <input className='btn1' type="submit" value="Register" onClick={HandleSubmit2} />
        </div>
        </div>
      
        
      </div>
        <div className='m-4 max-w-md'>
                <img
                  src={signup} // Replace this with your own image URL
                  alt="Login Visual"
                  className="bg-blue-700 h-[550px] w-[550px] rounded-lg shadow-lg"
                />
              </div>
     
    </div>
    
    </div>
    </div>
  )
}

export default Register