"use client"
import { getAuthors } from '@/api-service/author.service'
import { IAuthorCard } from '@/app/types/author.types'
import AddAuthoramodal from '@/app/ui/dashboard/authors/AddAuthors'
import AuthorCard from '@/app/ui/dashboard/authors/AuthorCard'
import React, { useEffect, useState } from 'react'

const Authors = () => {
  const [file, setFile] = useState("");
    const [authors, setAuthors] = useState([])
    const [addAuthorModal, setAddAuthorModal] = useState(false)
    const [editAuthor, setEditAuthor] = useState<IAuthorCard>(authors[0])
    const [authorId, setAuthorId] = useState<number | undefined | string>(0)
    useEffect(()=> {
        recieveAuthors()
    },[])
    const recieveAuthors =async()=> {
        const response = await getAuthors()
        setAuthors(response?.data)
    }
    const toggle =()=> {
        setAddAuthorModal(!addAuthorModal)
    } 
  return (
    <div className='p-[20px] w-[100%] flex flex-col gap-[20px]'>
        <AddAuthoramodal open={addAuthorModal} toggle={toggle} file={file} setFile={setFile} editAuthor={editAuthor} authorId={authorId}/>
      <button
        onClick={()=>setAddAuthorModal(true)}
        className="px-[15px] py-[8px] bg-violet-600 rounded-md text-white"
      >
        Add Author
      </button>
      <div className='w-[100%] flex flex-wrap gap-[30px]'>
        {authors?.map((item,index)=> {
            return <div key={index}>
                <AuthorCard authors={item} setAddAuthorModal={setAddAuthorModal} setAuthorId={setAuthorId} setFile={setFile} setEditAuthor={setEditAuthor}/>
            </div>
        })}
      </div>
    </div>
  )
}

export default Authors
