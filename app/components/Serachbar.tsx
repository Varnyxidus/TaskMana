'use client'

import { IconButton, Stack, TextField } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import React, { ChangeEvent, useState } from 'react'


interface SearchProp {
    onSearch: (query: string) => void
}

const Serachbar: React.FC<SearchProp> = ({onSearch}) => {
    const [searchValue, setSearchValue] = useState('')

    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchValue(value)
        onSearch(value)
    }

  return (
    <div className='relative w-9/12 text-gray-600'>
        <Stack direction='row'>
        <TextField 
            name='search'
            placeholder='Enter search...'
            value={searchValue} 
            onChange={searchHandler}
            className='bg-white h-10 pl-5 w-full border-black border rounded-full text-sm focus:outline-none' 
        />
        {searchValue && (
              <IconButton
                size="small"
                className="text-gray-400"
                onClick={() => {
                  setSearchValue("");
                  onSearch("");
                }}
              >
                <ClearIcon />
              </IconButton>
            )}
        {/* <Button type='submit' className='4' endIcon={<SearchIcon />} /> */}
        </Stack>
    </div>
  )
}

export default Serachbar