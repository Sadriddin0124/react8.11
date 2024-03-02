import { createGenre, updateGenre } from '@/api-service/genre.service'
import { IGenres, IGenresPayload } from '@/app/types/genres.types'
import React from 'react'
import { Modal, ModalBody } from 'reactstrap'

const AddGenre = ({open, toggle, editGenre}: {open: boolean, toggle: ()=> void; editGenre: IGenres}) => {
    const handleSubmit =async(formData: FormData)=> {
        const payload: IGenresPayload = {
            name: (formData?.get("name") as string) ? formData?.get("name") : editGenre?.name
        } 
        if (editGenre?.name !== "") {
            const response = await updateGenre({id: editGenre?.id, ...payload})
            if (response?.status === 200) {
                window.location.reload()
            }
        }
        else {
            const response = await createGenre({...payload})
            if (response?.status === 201) {
                window.location.reload()
            }

        }
    }
  return (
    <Modal isOpen={open} toggle={toggle}>
        <ModalBody>
            <h1 className='text-center text-[24px]'>{editGenre?.name !== "" ? "Edit Genre" : "Add Genre"}</h1>
            <form action={handleSubmit} className='flex flex-col gap-[10px]'>
                <input defaultValue={editGenre?.name} type="text" name='name' placeholder='name' className="w-[100%] border-[2px] px-[15px] py-[8px] rounded-md outline-none"/>
                <button className="px-[15px] py-[8px] bg-violet-600 rounded-md text-white">Save</button>
            </form>
        </ModalBody>
    </Modal>
  )
}

export default AddGenre
