import React, { useEffect } from 'react'
import { Routes ,Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from "./components/Navbar"
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingPage from './pages/SettingPage'
import { useAuthStore } from './store/useAuthStore'

const App = () => {
  const {checkAuth,authUser,isCheckingAuth} =useAuthStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth])
  console.log({authUser});
  if (isCheckingAuth && !authUser){
    return (
      <div className='flex items-center justify-center h-screen'>
        <span className="loading loading-infinity loading-sm"></span>
      </div>
    )
  }
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path ="/" element ={authUser? <HomePage/> :<Navigate to ="/login"/>}/>
        <Route path ="/signup" element ={<SignUpPage/>}/>
        <Route path ="/login" element ={<LoginPage/>}/>
        <Route path ="/settings" element ={<SettingPage/>}/>

      </Routes>

    </div>
   
  )
}

export default App



