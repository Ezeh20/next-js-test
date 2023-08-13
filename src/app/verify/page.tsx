'use client'
import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import { UserContext } from '@/context/userContext'

const Verify = () => {
  const {userData}:any = useContext(UserContext)

  const [verified, setVerified] = useState(false)
  const [code, setCode] = useState<number|undefined>()
  const [error, setError] = useState("")
  
  const verifyCode = async () =>{
    try {
      const res = await fetch('api/users/verifyEmail',{
        method: 'POST',
        headers:{
          accept: 'application/json',
        },
        body: JSON.stringify({
          token:code
        })
      })
      const data = await res.json()
      setVerified(true)
      console.log(data);
      
    } catch (error:any) {
      console.log(error);
      setError(error)
    }
  }

  const sendCode = async() =>{
    try {
      const res = await fetch('api/users/sendverifycode',{
        method: 'POST',
        headers: {
          accept: 'application/json'
        },
        body: JSON.stringify({
          email: userData?.email,
          emailType:"VERIFY",
          userId:userData?._id
        })
      })
      const data= await res.json()
      console.log(data);
      
    } catch (error:any) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    const urlToken = window.location.search.split("=")[1];
    const code = Number(urlToken)
    setCode(code)
  },[])

  return (
    <div className=' bg-slate-900 min-h-screen flex flex-col text-slate-50
     justify-center items-center gap-6
    '>
      {
        userData ? 
        <div>
         {
          userData?.isVerified ? "Account verified"  :

          <div>
             {
          verified ? "Account verified" :
        <div>
            <h3>Verify your account</h3>
          <div className=' flex flex-col text-center gap-3'>
            <p>Enter the code</p>
            <input type='number' value={code} className=' p-2 outline-none [-moz-appearance:_textfield] 
            [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none'
            placeholder='enter code' onChange={(e:any)=>setCode(e.target.value)}
            />
            <div className=' flex gap-3'>
            <button className=' bg-blue-800 text-slate-50 min-w-[150px] self-center py-2 px-6 rounded-md text-[16px] hover:cursor-pointer 
             hover:bg-orange-500 transition-all
            ' onClick={verifyCode}>Verify</button>
            <button className=' bg-blue-800 text-slate-50 min-w-[150px]  self-center py-2 px-6 rounded-md text-[16px] hover:cursor-pointer 
             hover:bg-orange-500 transition-all
            ' onClick={sendCode}>Send code </button>
            </div>
          </div>
        </div>
         }
          </div>
          
         }
        </div>
        : 'loading...'
      }
    </div>
  )
}

export default Verify