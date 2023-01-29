import React from 'react'
import {Link} from 'react-router-dom';

const button = () => {
  return (
    <div>
    <Link to="/Getstarted"><center> <button className='text-3xl mb-12 border-2 border-black bg-red-500 text-white rounded-full px-4 py-2'>GET STARTED</button></center></Link> 
    
    </div>
  )
}

export default button;
