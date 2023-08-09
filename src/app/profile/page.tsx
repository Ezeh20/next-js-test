"use client"

import React from 'react'
import axios from 'axios'
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter()
  const logout = async()=> {
    try {
      const {data} = await axios.get('/api/users/logout')
      if(!data.error){
        router.push('/')
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className=' min-h-screen bg-slate-950 text-slate-100 flex justify-center items-center'>
      <div className=' flex flex-col items-center'>
      <p>Profile</p>
      <button
      onClick={logout}
      className=' mt-4 bg-blue-800 p-3 hover:bg-red-600 hover:scale-105 transition-all duration-300 rounded-md'>Log out</button>
      </div>
    </div>
  )
}

export default Profile