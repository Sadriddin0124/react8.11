"use client";
import React from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import "@/app/ui/Auth/signUp/signUp.scss";
import { signUp } from "@/api-service/auth.service";
import { AuthPromise } from "@/app/types/auth.types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Notification } from "@/helpers/notifications.helper";
const SignIn = () => {
  const router = useRouter()
  const handleSubmit = async (formData: FormData) => {
    let full_name = formData.get("full_name");
    let username = formData.get("username");
    let password = formData.get("password");
    const payload = {
      full_name,
      username,
      password,
    };
    console.log(payload);
    const response: AuthPromise | undefined = await signUp({ ...payload });
    console.log(response);
    if (response?.tokens) {
      setTimeout(() => {
        router.push("/auth/signin");
      }, 2000);
      Notification({text: response?.message, type: "success"})
    }else {
      Notification({text: "username already exists or password mustn't be less than 6 characters", type: "error"})
  }
  };
  return (
    <div className="auth__container">
    <ToastContainer />
      <div className="auth">
        <form action={handleSubmit} className="auth__form" id="auth">
          <div className="auth__email">
            <FaUser className="auth__input-icon" />
            <input
              type="text"
              name="full_name"
              placeholder="Fullname"
              className="email"
            />
          </div>
          <div className="auth__email">
            <FaUser className="auth__input-icon" />
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="email"
            />
          </div>
          <div className="auth_password">
            <FaLock className="auth__input-icon" />
            <input
              className=" passwords"
              placeholder="Password"
              name="password"
            />
          </div>
          <button form="auth" className="auth__btn bg-white" type="submit">
            SIGN UP NOW
            <IoIosArrowForward size={24} />
          </button>
        </form>
        <div className="absolute z-20 bottom-[20px] right-[20px] flex gap-[5px] text-white">
          <p>Already have an Account,</p>
          <Link href="/auth/signin" className=" underline text-white">
            Sign In
          </Link>
        </div>
        <div className="auth__square"></div>
      </div>
    </div>
  );
};

export default SignIn;
