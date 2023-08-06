"use client"

import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import useRouter from 'next/navigation'

const SignUp = () => {
 const initialState = {
  email:'',
  password:'',
 }
  const [userData, setUserData] = React.useState(initialState)

  const handleSubmit = async (e) =>{
    e.preventDefault()
  }

  return (
    <div className=' bg-black flex  min-h-screen text-slate-50 items-center justify-center flex-col gap-5'>
      <h1 className=' md:text-[24px]'>Login</h1>
      <form className=' flex flex-col gap-5' onSubmit={handleSubmit}>
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
        <Link href='/signup'>Don`t have an account?</Link>
        </div>
      </form>
    </div>
  )
}

export default SignUp