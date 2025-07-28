import React from 'react'
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ destination = '/home'}) => {
  return (
    <div className='flex'>
        <Link to={destination} className=''>
            <BsArrowLeft className='text-2xl'/>
        </Link>
    </div>
  )
}

export default BackButton