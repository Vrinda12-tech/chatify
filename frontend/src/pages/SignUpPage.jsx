import React from 'react'
import { useState } from 'react';
import {useAuthStore} from "../store/useAuthStore.js"
import BorderAnimatedContainer from "../components/BoaderAnimatedContainer.jsx"
import {MessageCircleIcon,LockIcon,MailIcon,UserIcon,LoaderIcon} from "lucide-react"
import { Link } from 'react-router-dom'
import ParticleCanvas from '../components/ParticleCanvas.jsx'

const SignUpPage = () => {
  const [formData, setformData] = useState({fullName:"",email:"",password:""});
  const {signup,isSigningUp} =useAuthStore()
   const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };
  return (
    <div className='w-full flex items-center justify-center p-4 bg-slate-900'>
      <div className='relative w-full max-w-6xl md:h-[800px] h-[650px]'>
        <ParticleCanvas quantity={70}>
        <BorderAnimatedContainer>
          <div className ="w-full flex flex-col md:flex-row">
            <div className='md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30'>
            <div className='w-full max-w-md'>
              <div className='text-center mb-8'>
                <MessageCircleIcon className='w-12 h-12 mx-auto text-slate-400 mb-4'/>
                <h2 className='text-2xl font-bold text-slate-200 mb-2'>Create Account</h2>
                <p className="text-slate-400"> Sign Up For A New Account</p>

                </div>
                <form onSubmit={handleSubmit} className='space-y-6'>
                  <div>
                    <label className='auth-input-label'>Full Name</label>
                    <div className='relative'>
                      <UserIcon className ="auth-input-icon"/>
                      <input type='text'
                        value={formData.fullName}
                        onChange={(e)=>setformData({...formData,fullName:e.target.value})}
                         className='input'
                         placeholder='Vrinda'/>
                    </div>
                  </div>
                  <div>
                    <label className='auth-input-label'>Email</label>
                    <div className='relative'>
                      <MailIcon className="auth-input-icon"/>
                      <input
                        type='email'
                        value={formData.email}
                        onChange={(e)=>setformData({...formData,email:e.target.value})}
                        className='input'
                        placeholder='vrinda@example.com'
                      />
                    </div>
                  </div>
                  <div>
                    <label className='auth-input-label'>Password</label>
                    <div className='relative'>
                      <LockIcon className="auth-input-icon"/>
                      <input
                        type='password'
                        value={formData.password}
                        onChange={(e)=>setformData({...formData,password:e.target.value})}
                        className='input'
                        placeholder='••••••••'
                      />
                    </div>
                  </div>
                  <button
                    type='submit'
                    disabled={isSigningUp}
                    className='w-full flex items-center justify-center gap-2 rounded-lg bg-slate-200 px-4 py-3 font-semibold text-slate-900 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70'
                  >
                    {isSigningUp ? <LoaderIcon className='h-5 w-5 animate-spin' /> : null}
                    {isSigningUp ? 'Creating account...' : 'Create Account'}
                  </button>
                  
                   </form>
                   <div className='mt-6 text-center'>
                    <Link to ="/login" className ="auth-link">
                    Already have an account ?Login </Link>
                   </div>
                </div>
                </div>

            <div className='md:w-1/2 p-8 flex items-center justify-center bg-gradient-to-bl from-slate-800/20 to-transparent'>
              <div>
                <img
                  src="/signup_2.png"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">Join Us Today</h3>

                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy To Use</span>
                    <span className="auth-badge">Private</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </BorderAnimatedContainer>
        </ParticleCanvas>
      </div>

    </div>
  )
}

export default SignUpPage