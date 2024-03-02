"use client";
import { createAuthors, updateAuthors } from "@/api-service/author.service";
import { $api } from "@/api/interceptors";
import { IAuthorCard, IAuthorPayload } from "@/app/types/author.types";
import Image from "next/image";
import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Modal, ModalBody } from "reactstrap";

const AddAuthoramodal = ({
  open,
  toggle,
  file,
  setFile,
  editAuthor,
  authorId
}: {
  open: boolean;
  toggle: () => void;
  file: string,
  setFile: Dispatch<SetStateAction<string>>
  editAuthor: IAuthorCard
  authorId: number | undefined | string
}) => {
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    let file: File | null = e.target.files && e.target.files[0];
    let form = new FormData();
    form.append("file", file as Blob);
    const response = await $api.post("/files/upload", form);
    setFile(response?.data);
  };
  const handleSubmit = async(formData: FormData) => {
    const payload:IAuthorPayload = {
      full_name: formData.get("full_name") ? (formData.get("full_name") as string) : editAuthor?.full_name,
      birthdate: formData.get("birthdate") ? (formData.get("birthdate") as string) : editAuthor?.birthdate,
      country: formData.get("country") ? (formData.get("country") as string) : editAuthor?.country,
      image: file
    }
    if (authorId !== 0) {
      const response = await updateAuthors({id: authorId, ...payload})
      if(response?.status === 200){
        window.location.reload()
      }
    }
    const response = await createAuthors({...payload})
    if(response?.status === 201){
      window.location.reload()
    }
  };
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalBody>
        <form action={handleSubmit} className="grid grid-cols-2 gap-[10px]">
          <div className="border-[2px] relative">
            <input
              onChange={handleFileChange}
              type="file"
              className="w-[100%] h-[100%] z-10 absolute opacity-0 cursor-crosshair"
            />
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
              placeholder="full_name"
              name="full_name"
              className="w-[100%] border-[2px] px-[15px] py-[8px] rounded-md outline-none"
              defaultValue={editAuthor?.full_name}
            />
            <input
              type="date"
              placeholder="birthdate"
              name="birthdate"
              className="w-[100%] border-[2px] px-[15px] py-[8px] rounded-md outline-none"
              defaultValue={editAuthor?.birthdate}
            />
            <input
              type="text"
              placeholder="country"
              name="country"
              className="w-[100%] border-[2px] px-[15px] py-[8px] rounded-md outline-none"
              defaultValue={editAuthor?.country}
            />
          </div>

          <button className="w-[100%] bg-violet-500 text-white px-[15px] py-[8px] rounded-md col-span-2">
            Save
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default AddAuthoramodal;
