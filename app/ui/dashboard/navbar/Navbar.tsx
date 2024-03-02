"use client"
import React from 'react'
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname()
  return (
    <nav className='w-[100%]  bg-white flex justify-between items-center px-[20px] fixed z-20'>
      <h1 className='text-[24px] font-[600]'>Library</h1>
      <h1 className='text-[24px] font-[600]'>{pathname === "/dashboard/authors" ? "Authors" : pathname == "/dashboard/genres" ? "Genres" : pathname == "/dashboard" ? "Books" : "Books"}</h1>
      <Image src={"/logo.jpg"} width={84} height={84} alt='logo'/>
    </nav>
  )
}

export default Navbar
