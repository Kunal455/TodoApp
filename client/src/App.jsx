import {Routes, Route} from "react-router-dom"
import About from "./pages/About/About"
import HomePage from "./pages/Home/HomePage"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import Landing from "./pages/Landing/Landing"
import './index.css'
import { Toaster } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css'; // for styling
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // for toggler & collapse




function App() {


  return (
    <>
    
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/about' element={<About />} />
        

      </Routes>
      <Toaster />
    </>
  )
}

export default App
