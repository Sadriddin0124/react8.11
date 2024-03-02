import { deleteAuthor, getAuthor } from "@/api-service/author.service";
import { IAuthorCard } from "@/app/types/author.types";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

const AuthorCard = ({
  authors,
  setAddAuthorModal,
  setAuthorId,
  setFile,
  setEditAuthor
}: {
  setFile: Dispatch<SetStateAction<string>>;
  setAddAuthorModal: Dispatch<SetStateAction<boolean>>;
  setAuthorId: Dispatch<SetStateAction<number | undefined | string>>;
  setEditAuthor: Dispatch<SetStateAction<IAuthorCard>>;
  authors: IAuthorCard;
}) => {
  const editAuthor = async () => {
    const response = await getAuthor(authors?.id);
    setAddAuthorModal(true);
    setFile(authors?.image);
    setAuthorId(authors?.id);
    setEditAuthor(response?.data)
  };
  const removeAuthor =async()=> {
    const response = await deleteAuthor(authors?.id)
    if (response?.status === 200) {
      window.location.reload()
    }
  }
  return (
    <div className="w-[500px] min-h-[300px] relative overflow-hidden rounded-md">
      <Image
        src={authors?.image}
        alt={authors?.full_name}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <div className="w-[55%] text-white absolute bottom-0 right-0 z-10 px-[10px] py-[20px] flex flex-col">
        <div className="flex gap-[10px] self-end">
          <button
            onClick={editAuthor}
            className="px-[15px] py-[8px] bg-blue-400 rounded-md"
          >
            edit
          </button>
          <button onClick={removeAuthor} className="px-[15px] py-[8px] bg-red-600 rounded-md">
            delete
          </button>
        </div>
        <h1 className="text-[18px]">Full name: {authors?.full_name}</h1>
        <h3 className="text-[18px]">Country: {authors?.country}</h3>
        <h4 className="text-[18px]">
          Birthdate: {authors?.birthdate?.slice(0, 10)}
        </h4>
      </div>
      <div className="absolute bg-[#8a5cf6b1] w-[100%] h-[100%] rotate-[-65deg] right-[-160px]"></div>
    </div>
  );
};

export default AuthorCard;
