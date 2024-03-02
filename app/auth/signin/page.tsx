"use client";
import React from 'react'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import "@/app/ui/Auth/signIn/signIn.scss"
import { signIn } from '@/api-service/auth.service';
import { AuthPromise } from '@/app/types/auth.types';
import { redirect } from 'next/navigation';
import Link from 'next/link';
const SignIn = () => {

  const handleSubmit =  async(formData: FormData) => {
    const username = formData.get("username")
    const password = formData.get("password")
    console.log(username, "username");
    console.log(password, "password");
    const response: AuthPromise | undefined = await signIn({username, password})
    if(response?.tokens){
      redirect("/dashboard")
    }    
  }
  return (
    <div className="auth__container">
      <div className="auth">
        <form action={handleSubmit} className="auth__form" id="auth">
          <div className="auth__email">
            <FaUser className="auth__input-icon" />
            <input
              type="text"
              placeholder="Username"
              className="email"
              name='username'
            />
          </div>
          <div className="auth_password">
            <FaLock className="auth__input-icon" />
            <input
              className=" passwords"
              placeholder="Password"
              name='password'
            />
          </div>
          <button form="auth" className="auth__btn bg-white" type="submit">
            SIGN IN NOW
            <IoIosArrowForward size={24}/>
          </button>
        </form>
        <div className="absolute z-20 bottom-[20px] right-[20px] flex gap-[5px] text-white">
          <p>Don't have an Account,</p>
          <Link href="/auth/signup" className=" underline text-white">
            Sign Up
          </Link>
        </div>
        <div className="auth__square"></div>
      </div>
    </div>
  )
}

export default SignIn
