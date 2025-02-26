import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React, { useState } from 'react'

interface filterProp{
    onFilter: (stats: string) => void
}

const statusChoice = [
    {label: 'All', value: 'All'},
    {label: "Pending", value: "Pending"},
    {label: "Done", value: "Done"}
]

const FilterBar: React.FC<filterProp> = ({onFilter}) => {
    const [filter, setFilter] = useState("All")

    const handleFilter = (e: SelectChangeEvent<string>) => {
        const value = e.target.value;
        setFilter(value);
        onFilter(value);
    };

  return (
    <div className='w-fit'>
         <FormControl className='w-fit'>
            <Select value={filter} onChange={handleFilter}>
              {statusChoice.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
    </div>
  )
}

export default FilterBar