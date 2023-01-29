import React from 'react'
import Navbar from './navbar';
import Middle from './midcontainer';
import End from './End';
import Button from './button';
const Home = () => {
  return (
    <div>
        <Navbar/>
        <Middle/>
        <End/>
        <Button></Button>
    </div>
  )
}

export default Home
