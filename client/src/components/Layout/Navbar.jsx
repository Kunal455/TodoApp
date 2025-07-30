import React, { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setusername] = useState("")

  const navigate = useNavigate()

  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("todoapp"))
    if (data && data.user && data.user.username) {
    setusername(data.user.username)
  }
  }, [])

  const logoutHandle = () => {
    localStorage.removeItem("todoapp")
    toast.success("Logout Successfullt")
    navigate('/login')
  }

  const linkStyle = ({ isActive }) =>
    `px-4 py-2 rounded transition relative ${
      isActive
        ? 'text-white after:content-[""] after:absolute no-underline after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-gray-800'
        : 'text-white no-underline hover:text-blue-700'
    }`;

  return (
    <div className="w-full  bg-gray-100 shadow">
      <nav className="bg-[blue] px-4 py-3 flex items-center justify-between shadow-sm relative">
        <div className="text-2xl font-bold text-white">Welcome, {username}!</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center no-underline gap-6">
          <NavLink to="/home" className={linkStyle}>
            Home
          </NavLink>
         
          <button  onClick={logoutHandle} className="p-2 rounded-full hover:bg-gray-200 transition" title="Logout">
            <FontAwesomeIcon icon={faPowerOff} className="text-red-600 text-xl" />
          </button>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 text-2xl">
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center gap-2 py-4 md:hidden z-10">
            <NavLink to="/home" className={linkStyle}>
              Home
            </NavLink>
            
            <button onClick={logoutHandle} className="p-2 rounded-full hover:bg-gray-200 transition" title="Logout">
              <FontAwesomeIcon icon={faPowerOff} className="text-red-600 text-xl" />
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
