'use client'

import { Stack, Typography, Button, Box, Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Serachbar from './Serachbar'
import FilterBar from './Filter'

interface IInterpreation{
    $id: string,
    title: string,
    description: string,
    status: string
}

export default function TaskList(){
    const [interpretations, setInterpretations] = useState<IInterpreation[]>([]);
    const [filteredInterpretations, setFilteredInterpretations] = useState<IInterpreation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);

    useEffect(() => {
        const fetchInterpreations = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("/api/interpretations");
                if(!response.ok){
                    throw new Error("Failed to fetch Interpreations")
                }
                const data = await response.json();
                console.log(data)
                setInterpretations(data.interpretations);
                setFilteredInterpretations(data.interpretations)
            } catch (error) {
                console.error("Error: ", error);
                setError("Failed to load collections, in need of inspection")
            } finally {
                setIsLoading(false);
            }
        };

        fetchInterpreations();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await fetch(`api/interpretations/${id}`, {method: "DELETE"});
            setInterpretations((prevInterpretations) => prevInterpretations?.filter((i) => i.$id !== id))
            setFilteredInterpretations((prevInterpretations) => prevInterpretations?.filter((i) => i.$id !== id))
        } catch (error) {
            setError("Failed to delete interpretation, try again")
        }
    }

    const handleSearch = (query: string) => {
        setFilteredInterpretations(
          interpretations.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
          )
        );

        console.log(filteredInterpretations)
      };

    const handleFilter = (stats: string) =>{
        setFilteredInterpretations(
            stats === "All" ? interpretations : interpretations.filter((tasks) => tasks.status === stats)
        )
    }

    // Calculate the current items to display based on pagination
    const currentItems = React.useMemo(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return filteredInterpretations.slice(indexOfFirstItem, indexOfLastItem);
    }, [filteredInterpretations, currentPage, itemsPerPage]);
    
    // Calculate the total number of pages
    const totalPages = React.useMemo(() =>
        Math.ceil(filteredInterpretations.length / itemsPerPage), 
    [filteredInterpretations, itemsPerPage]);
    
    // Change page handler
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

  return (
    <div>
        {error && <p className='py-4 text-red-500'>{error}</p>}
        <div>
            <Box
                display="flex"
                flexDirection={{ md: "row" }}
                gap={2}
                mb={4}
                mt={2}
                >
                <Serachbar onSearch={handleSearch}/>
                <FilterBar onFilter={handleFilter}/>
            </Box>
        </div>
        {isLoading ? (<Typography variant='h6'>Loading...</Typography>) : filteredInterpretations?.length > 0
        ? (
        <div>
            <React.Suspense fallback={<Typography>Loading tasks...</Typography>}>
                <div>
                {
                    currentItems?.map((interpretation) => (
                        <div key={interpretation.$id} className='p-4 my-2 rounded-md border-b leading-8'>
                            <Stack>
                                <Typography variant='h4'>
                                    {interpretation.title}
                                </Typography>
                                <Typography variant='subtitle1'>
                                    {interpretation.description}
                                </Typography>
                                {interpretation.status === 'Pending' ? 
                                    <Typography variant='body1' color='warning'>
                                        {interpretation.status}
                                    </Typography>
                                :
                                    <Typography variant='body1' color='success'>
                                        {interpretation.status}
                                    </Typography>
                                }
                            </Stack>

                            <Stack direction='row' gap={4} marginTop={2}>
                                <Link className='bg-orange-500 px-4 py-2 rounded-md text-sm font-bold text-white uppercase' href={`/edit/${interpretation.$id}`}>Edit</Link>
                                <Button onClick={() => handleDelete(interpretation.$id)} className='bg-red-500 px-4 py-2 rounded-md text-sm font-bold text-white'>Delete</Button>
                            </Stack>
                        </div>
                    ))}
                    {/* Pagination Control */}
                    <Box display="flex" justifyContent="center" mt={4} mb={6}>
                        <Pagination 
                            count={totalPages} 
                            page={currentPage} 
                            onChange={handlePageChange} 
                            color="primary" 
                        />
                    </Box>
                </div>
            </React.Suspense>
        </div>
        ): (
            <p>No collection found</p>
        )}
    </div>
  )
}