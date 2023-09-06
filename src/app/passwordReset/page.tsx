'use client'
import React from 'react'
import { useState } from 'react'

const PasswordReset = () => {
  const [emailSent, setEmailSent] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <main className=' min-h-screen bg-black text-slate-200 flex items-center justify-center'>
        {
          !emailSent ?
          (<div className=' flex flex-col gap-1 '>
          <label htmlFor="password">Email</label>
          <input type="text" id='password' value={email} placeholder='email'
          className=' rounded-md p-4'
          onChange={(e)=> setEmail(e.target.value)} 
          />
          <button className=' bg-slate-100 text-black p-2 mt-4 hover:text-slate-50 hover:bg-slate-800 rounded-md'>Submit</button>
        </div>):''
        }
    </main>
  )
}

export default PasswordReset