"use client"
import { deleteGenre, getGenre } from '@/api-service/genre.service'
import { IGenres } from '@/app/types/genres.types'
import AddGenre from '@/app/ui/dashboard/genres/AddGenre'
import React, { useEffect, useState } from 'react'

const Genres = () => {
  const [addGenreModal, setAddGenreModal] = useState(false)
  const [genres, setGenres] = useState<Array<IGenres>>([])
  const [editGenre, setEditGenre] = useState<IGenres>({name: ""})
  useEffect(()=> {
    recieveGenres()
  },[])
  const recieveGenres =async()=> {
    const response = await getGenre()
    console.log(response);
    setGenres(response?.data)
  }
  const toggle =()=> {
    setAddGenreModal(false)
    setEditGenre({name: ""})
  }
  const updateGenre =(item: IGenres)=> {
    setEditGenre(item)
    setAddGenreModal(true)
  }
  return (
    <div className='p-[20px] flex flex-col gap-[30px]'>
      <AddGenre open={addGenreModal} toggle={toggle} editGenre={editGenre}/>
      <button
        onClick={()=>setAddGenreModal(true)}
        className="px-[15px] py-[8px] bg-violet-600 rounded-md text-white"
      >
        Add Genre
      </button>
      <div className='w-[100%] flex flex-wrap gap-[20px]'>
        {
          genres?.map((item,index)=> {
            return <div key={index} className='w-[270px] p-[20px] bg-violet-500 text-white flex flex-col items-center rounded-md'>
              <h1 className='text-[30px]'>Title</h1>
              <p className='text-[24px]'>{item?.name}</p>
              <div className='flex gap-[10px]'>
                <button onClick={()=>updateGenre(item)} className='px-[15px] py-[8px] bg-blue-400 rounded-md'>edit</button>
                <button onClick={()=>deleteGenre(item?.id)} className='px-[15px] py-[8px] bg-red-600 rounded-md'>delete</button>
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default Genres
