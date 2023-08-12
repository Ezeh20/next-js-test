"use client";

import { useEffect, useState } from "react";
import { createContext } from "react";

interface User{
    _id: string,
    username: string,
    email:string,
    isAdmin: boolean,
    isVerified: boolean
  }

export const UserContext = createContext<null>(null);

export const UserContextProvider = ({ children }:any) => {

const [userData, setUserData] = useState<User>()
const [sessionExpired, setSessionExpried] = useState(false)
const [loading, setLoading] = useState(true)
const [loadData, setLoadData] = useState(false)
 
useEffect(()=>{
//fetch the user
const userInfo = async()=>{
    try {
      const res = await fetch('/api/users/profile')
      const data = await res.json()
      console.log(data);
      setUserData(data.data)
      setLoading(false)
      if(data.error === "jwt expired"){
        setSessionExpried(true)
      }
    } catch (error:any) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  }
  userInfo()
},[loadData])
 
    const value:any = {userData, loading, sessionExpired, setLoadData}
    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
};
