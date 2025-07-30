import React from 'react'
import {Link} from "react-router-dom"
import Hero from "../../assets/Checklist.jpg"




const Landing = () => {
  return (
    <div className='h-[730px] w-[1536px]'>
      <div className='border-spacing-0 px-25   pt-3 border-blue-400 border-2 h-[70px] bg-[blue]'>
        
      </div>
    <div className='hero flex align-center justify-between  '>
        <div className="intro font-[Lucida_Sans] m-20 pt-7  ">
            <h1>
                <span className='tag1 font-bold text-[41px] text-[rgb(143,157,201)]'>Never miss a task again — your digital assistant for everyday goals.</span>
                <div className='tag2 text-[rgb(218,114,69)] font-bold  text-[41px]'>ToDo List</div>
                
            </h1>

            <p className='para mt-5 text-[18px] font-[Lucida_Sans]'>Stay on top of your day with our smart To-Do List app — your personal task manager to organize, prioritize, and accomplish more. Whether it’s daily goals, study plans, or project deadlines, manage everything in one place and boost your productivity with ease</p>
        
            <Link className=' rounded-xl inline-block px-4 py-2 mt-6 text-white bg-orange-400 red no-underline' to='/register'>Register</Link>
            <Link className=' inline-block rounded-xl px-5 py-2 ml-3 text-white bg-blue-500 blue no-underline'to='/login'>Login</Link>
        </div>
        <div className='mr-12'>
            <img src={Hero} alt="" className='h-[600px] w-[1600px]'/>
        </div>
    </div>
    </div>
  )
}

export default Landing