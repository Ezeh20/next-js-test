"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from "next/navigation";
import Link from 'next/link';

interface User{
  _id: string,
  username: string,
  email:string,
  isAdmin: boolean,
  isVerified: boolean
}

const Profile = () => {
  const router = useRouter()
const [userData, setUserData] = useState<User>()
const [sessionExpired, setSessionExpried] = useState(false)
const [loading, setLoading] = useState(false)
const [error, setError] = useState("")

  //logout function
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

  useEffect(()=>{
    const userInfo = async()=>{
      setLoading(true)
      try {
        const res = await fetch('/api/users/profile')
        setLoading(false)
        const data = await res.json()
        setUserData(data.data)
        if(data.error){
          setSessionExpried(true)
        }
      } catch (error:any) {
        console.log(error);
      }
    }
    userInfo()
  },[router])
  
  //if session has expired popup a revalidate
  if(sessionExpired){
     logout()
  }

  return (
    <div className=' min-h-screen bg-slate-950 text-slate-100 flex justify-center items-center'>
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
    </div>
  )
}

export default Profile