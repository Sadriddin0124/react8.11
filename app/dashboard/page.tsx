"use client"
import React, { useEffect, useState } from 'react'
import AddBook from '../ui/dashboard/books/AddBook'
import { getBooks } from '@/api-service/book.service'
import BookCard from '../ui/dashboard/books/BookCard'
import { IBookCard } from '../types/book.types'

const Dashboard = () => {
  const [file, setFile] = useState("")
  const [addBookModal, setAddBookModal] = useState(false)
  const [books, setBooks] = useState([])
  const [editId, setEditId] = useState<number | undefined>(0)
  const [editItem, setEditItem] = useState<IBookCard>(books[0])
  useEffect(()=> {
    recieveBooks()
  },[])
  const recieveBooks =async()=> {
    const response = await getBooks()
    setBooks(response?.data);
  }
  const toggle =()=> {
    setAddBookModal(!addBookModal)
  }
  const editBook =()=> {

  }
  return (
    <div className='p-[20px] flex flex-col gap-[30px]'>
      <AddBook open={addBookModal} toggle={toggle} file={file} setFile={setFile} editItem={editItem} editId={editId} setEditId={setEditId}/>
      <button
        onClick={()=>setAddBookModal(true)}
        className="px-[15px] py-[8px] bg-violet-600 rounded-md text-white"
      >
        Add Book
      </button>
      <div className='flex gap-[20px] flex-wrap'>
        {
          books?.map((item,index)=> {
            return <div key={index}>
              <BookCard books={item} setAddBookModal={setAddBookModal} setEditId={setEditId} setFile={setFile} setEditItem={setEditItem}/>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default Dashboard
