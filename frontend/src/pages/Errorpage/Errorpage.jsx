import React from 'react'
import { Link } from 'react-router-dom'
import error from '../../assets/images/404.gif'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'

const Errorpage = () => {
  return (
    <div className='bg-white grid place-items-center h-[100vh]'>
      <div className='flex lg:flex-row md:flex-row flex-col items-center'>
        <img src={error} className='h-80' alt='' />
        <div>
          <h3 className='text-4xl font-bold text-red-500'>Page Not Found!</h3>
          <p className='mt-4 text-xl text-gray-600 flex items-center'>Go back to&nbsp;
            <Link
              to='/'
              className='text-blue-500 hover:text-blue-400 transition duration-300 flex items-center gap-2'
            >
              Dashboard
              <HiOutlineArrowNarrowRight />
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Errorpage
