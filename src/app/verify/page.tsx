'use client'
import React from 'react'
import { useContext } from 'react'
import { UserContext } from '@/context/userContext'

const Verify = () => {
  const {userData, loading, sessionExpired, setLoadData}:any = useContext(UserContext)

  console.log("verify page",userData);
  
  return (
    <div className=' bg-slate-900 min-h-screen flex flex-col text-slate-50
     justify-center items-center gap-6
    '>
      <h3>Verify your account</h3>
      <div className=' flex flex-col text-center gap-3'>
        <p>Enter the code</p>
        <input type="number"  className=' p-2 outline-none [-moz-appearance:_textfield] 
        [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none'/>
        <button className=' bg-blue-800 text-slate-50 w-max self-center py-2 px-6 rounded-md text-[16px] hover:cursor-pointer 
         hover:bg-orange-500 transition-all
        '>Send code </button>
      </div>
    </div>
  )
}

export default Verify