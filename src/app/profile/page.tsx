"use client"
import React from 'react'
import axios from 'axios'
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { UserContext } from '@/context/userContext';

const Profile = () => {
  const router = useRouter()
  const {userData, loading, sessionExpired, setLoadData}:any = useContext(UserContext)

useEffect(()=>{
   setLoadData(true)
},[setLoadData])

  //logout function
  const logout = async()=> {
    try {
      const {data} = await axios.get('/api/users/logout')
      if(!data.error){
        router.push('/')
      }
    } catch (error) {
      console.log(error);
    }
  }

 
  //if session has expired popup a revalidate
  if(sessionExpired){
     logout()
  }

  //resend verificationCode
  const resendCode = async()=>{
    try {
      const res = await fetch('api/users/sendverifycode', {
        method: 'POST',
        headers: {
         accept: 'application/json'
        },
        body: JSON.stringify({
          email:userData?.email,
          emailType:"VERIFY",
          userId:userData?._id
        })
      })
      const data = await res.json()
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className=' min-h-screen bg-slate-950 text-slate-100 flex  flex-col gap-3 justify-center items-center'>
      <div className=' flex flex-col items-center'>
      <p>Profile</p>
      {
       userData?.username
      }
      <button
      onClick={logout}
      className=' mt-4 bg-blue-800 p-3 hover:bg-red-600 hover:scale-105 transition-all duration-300 rounded-md'>Log out</button>
      </div>
      <div>
        <Link href={`profile/${userData?._id}`}>Link</Link>
      </div>
      {
        loading ? "loading..." : <Link href={'/verify'}>Verify</Link>
      }
    </div>
  )
}

export default Profile