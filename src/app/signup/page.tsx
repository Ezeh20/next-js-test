"use client"
import React, { useEffect } from 'react'
import {axios} from 'axios'
import Link from 'next/link'
import useRouter from 'next/navigation'

const SignUp = () => {
  const router = useRouter()
 const initialState = {
  username:'',
  email:'',
  password:'',
 }
  const [userData, setUserData] = React.useState(initialState)
  const [disabled, setDisabled] = React.useState(true)

  useEffect(()=>{
      if(userData.email.length > 0 && userData.password.length > 0 && userData.username.length > 0){
        setDisabled(false)
      }else{
        setDisabled(true)
      }
  },[userData])

  const handleSubmit = async (e) =>{
    e.preventDefault()
  }

  return (
    <div className=' bg-black flex  min-h-screen text-slate-50 items-center justify-center flex-col gap-5'>
      <h1 className=' md:text-[24px]'>SignUp</h1>
      <form className=' flex flex-col gap-5' onSubmit={handleSubmit}>
        <div className=' flex flex-col gap-1 '>
          <label htmlFor="username">username</label>
          <input type="text" id='username' placeholder='username'
          className=' rounded-md p-4' 
          value={userData.username} 
          onChange={(e)=> setUserData({...userData, username:e.target.value})}
          />
        </div>
        <div className=' flex flex-col gap-1 '>
          <label htmlFor="email">email</label>
          <input type="email" id='email' placeholder='email'
          className=' rounded-md p-4' 
          value={userData.email} 
          onChange={(e)=> setUserData({...userData, email:e.target.value})}
          />
        </div>
        <div className=' flex flex-col gap-1 '>
          <label htmlFor="password">password</label>
          <input type="password" id='password' placeholder='password'
          className=' rounded-md p-4' 
          value={userData.password} 
          onChange={(e)=> setUserData({...userData, password:e.target.value})}
          />
        </div>
        <div className=' flex flex-col gap-5 justify-center items-center'>
        <button className=' bg-slate-50 text-slate-900 w-full p-2 rounded-md'>SignUp</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp