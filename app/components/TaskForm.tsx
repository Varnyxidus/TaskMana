'use client'

import React, { ChangeEvent, MouseEventHandler, useState } from 'react'
import { Button, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function TaskForm(){
    const [formData, setFormData] = useState({title: "", description: "", status: ""})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string|null>(null)

    const router = useRouter()
    const statusChoice = [
        {label: "Pending", value: "Pending"},
        {label: "Done", value: "Done"},
    ]

    const handleInputChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setFormData((prevData) => ({
            ...prevData, [e.target.name]: e.target.value
        }))

        console.log(formData) //troubleshooting
    }

    const handleSelect = (e: SelectChangeEvent<string>) => {
        setFormData((prevData) => ({
            ...prevData, status: e.target.value as string
          }))
    }

    const handleSubmit = async(e: React.FormEvent) =>{
        e.preventDefault();

        if(!formData.title || !formData.description || !formData.status){
            setError("Please fill in all fields!")
            return
        }

        setError(null)
        setIsLoading(true)

        try {
            const response = await fetch('api/interpretations', {
                method: "POST", 
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if(!response.ok){
                throw new Error("Can't create a task!")
            }

            router.push('/');
        } catch (error) {
            console.log(error)
            setError("Something is fishy here")
        } finally{
            setIsLoading(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='flex gap-3 flex-col w-200'>
                <Typography variant='h6'>Title</Typography>
                <input type='text' name='title' value={formData.title} placeholder='Title' className='py-1 px-4 border rounded-md' onChange={handleInputChange}/>

                <Typography variant='h6'>Description</Typography>
                <textarea name='description' value={formData.description} rows={6} placeholder='Description' className='py-1 px-4 border rounded-md resize-none' onChange={handleInputChange}/>
                
                <Typography variant='h6'>Status</Typography>
                <Select className='form-select' value={formData.status} onChange={handleSelect}>
                    {statusChoice.map((option) => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                </Select>
                <Button className='bg-black text-white mt-5 mb-5 px-4 py-1 rounded-md cursor-pointer' type='submit' disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add Task"}
                </Button>
            </form>
            {error && <p className='text-red-500 mt-4 mb-5'>{error}</p>}
        </div>
    )
}