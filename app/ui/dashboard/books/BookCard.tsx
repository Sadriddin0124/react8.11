import { deleteBook, getBook } from "@/api-service/book.service";
import { EditBook, IBookCard } from "@/app/types/book.types";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

const BookCard = ({ books, setEditId, setAddBookModal, setFile, setEditItem }: {setEditItem: Dispatch<SetStateAction<IBookCard>>; books: IBookCard, setFile: Dispatch<SetStateAction<string>>; setEditId: Dispatch<SetStateAction<number | undefined>>; setAddBookModal: Dispatch<SetStateAction<boolean>>}) => {
    const editBook =async()=> {
        const response = await getBook(books?.id)
        setEditId(books?.id)
        setAddBookModal(true)
        setFile(books?.image)
        setEditItem(response?.data)
    }
    const removeBook =async()=> {
      const response = await deleteBook(books?.id)
      if (response?.status === 200) {
        window?.location?.reload()
      }
    }
  return (
    <div className="relative w-[550px] h-[400px] overflow-hidden rounded-md">
      <Image
        src={books?.image}
        alt={"authors?.full_name"}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <div className="h-[400px] w-[250px] absolute right-0 z-10 text-white p-[10px] flex flex-col justify-center">
        <h1 className="text-[20px]">Name: {books?.name}</h1>
        <p>Author: {books?.author?.full_name}</p>
        <p>Genre: {books?.janr?.name}</p>
        <p>Price: {books?.price}</p>
        <p>Code: {books?.code}</p>
        <div>
          <p>Description</p>
          <hr />
          <p>{books?.description}</p>
        </div>
        <div className="flex gap-[10px] self-end">
          <button onClick={()=>editBook()} className="px-[15px] py-[8px] bg-blue-400 rounded-md">
            edit
          </button>
          <button onClick={removeBook} className="px-[15px] py-[8px] bg-red-600 rounded-md">
            delete
          </button>
        </div>
      </div>
      <div className="w-[500px] h-[500px] rounded-full bg-[#8a5cf6cd] absolute top-[-50px] right-[-150px]"></div>
    </div>
  );
};

export default BookCard;
