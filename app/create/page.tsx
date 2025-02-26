import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import TaskForm from '../components/TaskForm'

const createPage = () => {

  return (
    <div className='flex justify-center'>
        <Stack>
            <Typography variant='h2' marginY={8}>Add New Task</Typography>
            <TaskForm />
        </Stack>
    </div>
  )
}

export default createPage