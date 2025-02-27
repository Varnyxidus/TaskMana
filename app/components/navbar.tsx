import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='p-6 border-b flex justify-between bg-orange-600'>
        <Link href='/' className='text-2xl font-bold text-white'>TaskMana</Link>
        <Link href='/create' className='bg-slate-100 grid items-center text-orange-600 py-2 px-4 rounded-full font-bold shadow-md'>Add Task</Link>
    </div>
  )
}

export default Navbar