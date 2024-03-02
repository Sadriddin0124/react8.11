"use client"
import { getAuthors } from "@/api-service/author.service";
import { createBook, getBook, updateBook } from "@/api-service/book.service";
import { getGenre } from "@/api-service/genre.service";
import { $api } from "@/api/interceptors";
import { IAuthorMap } from "@/app/types/author.types";
import { EditBook, IBookCard } from "@/app/types/book.types";
import { IGenres } from "@/app/types/genres.types";
import Image from "next/image";
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";

const AddBook = ({ open, toggle, file, setFile, editId, editItem }: {editItem: IBookCard; open: boolean; toggle: () => void, file: string, setFile: Dispatch<SetStateAction<string>>; editId: number | undefined; setEditId: Dispatch<SetStateAction<number | undefined>> }) => {
    const [authors, setAuthors] = useState<Array<IAuthorMap>>([])
    const [genres, setGenres] = useState<Array<IGenres>>([])
    useEffect(()=> {
      recieveAuthors()
      recieveGenres()
    },[])
    const recieveAuthors =async()=> {
      const response = await getAuthors()
      setAuthors(response?.data); 
    }
    const recieveGenres =async()=> {
      const response = await getGenre()
      setGenres(response?.data)
    }
    const handleFileChange =async(e:ChangeEvent<HTMLInputElement>) => {
        let file: File | null = e.target.files && e.target.files[0]
        let form = new FormData()
        form.append("file", file as Blob)        
        const response = await $api.post("/files/upload", form)
        setFile(response?.data)
    }
    const handleSubmit = async(formData: FormData)=> {
        const payload = {
          name: formData.get("name") ? (formData.get("name") as string) : editItem?.name,
          price: Number(formData.get("price")) ?  Number(formData.get("price")) : editItem?.price,
          code: formData.get("code") as string ? formData.get("code") as string : editItem?.code,
          author_id: Number(formData.get("author_id")) ? Number(formData.get("author_id")) : editItem?.author_id,
          janr_id: Number(formData.get("janr_id")) ? Number(formData.get("janr_id")) : editItem?.janr_id,
          description: formData.get("description") as string ? formData.get("description") as string : editItem?.description,
          image: file ? file : editItem?.image
        }
        if(editId !== 0) {
          console.log();
          const response = await updateBook({id: editId , ...payload})
           
          if (response?.status === 200) {
            window?.location.reload()
          }
        }else {
          const response = await createBook({...payload})
          if (response?.status === 201) {
            window?.location.reload()
          }
        }
    }
  return (
      <Modal isOpen={open} toggle={toggle}>
        <ModalBody>
          <form action={handleSubmit} className="grid grid-cols-2 gap-[10px]">
            <div className="border-[2px] relative">
              <input onChange={handleFileChange} type="file" className="w-[100%] h-[100%] z-10 absolute opacity-0 cursor-crosshair"/>
              <Image
                src={file ? file : "/upload.png"}
                alt="upload_image"
                fill
                className=" object-contain"
              />
            </div>
            <div className="flex flex-col gap-[5px]">
              <input
                type="text"
                placeholder="name"
                name="name"
                className="w-[100%] border-[2px] px-[15px] py-[8px] rounded-md outline-none"
                defaultValue={editItem?.name}
              />
              <input
                type="number"
                placeholder="price"
                name="price"
                className="w-[100%] border-[2px] px-[15px] py-[8px] rounded-md outline-none"
                defaultValue={editItem?.price}
              />
              <input
                type="number"
                placeholder="code"
                name="code"
                className="w-[100%] border-[2px] px-[15px] py-[8px] rounded-md outline-none"
                defaultValue={editItem?.code}
              />
              <select
                name="author_id"
                className="w-[100%] border-[2px] px-[15px] py-[8px] rounded-md outline-none"
                defaultValue={editItem?.author_id}
              >
                {
                  authors?.map((item,index)=> <option key={index} value={item?.id}>{item?.full_name}</option>)
                }
              </select>
              <select
                name="janr_id"
                className="w-[100%] border-[2px] px-[15px] py-[8px] rounded-md outline-none"
                defaultValue={editItem?.janr_id}
              >
                {
                  genres?.map((item,index)=> <option key={index} value={item?.id}>{item?.name}</option>)
                }
              </select>
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="resize-none w-[100%] border-[2px] px-[15px] py-[8px] rounded-md outline-none col-span-2"
              rows={5}
              defaultValue={editItem?.description}
            ></textarea>
            <button className="w-[100%] bg-violet-500 text-white px-[15px] py-[8px] rounded-md col-span-2">Save</button>
          </form>
        </ModalBody>
      </Modal>
  );
};

export default AddBook;
