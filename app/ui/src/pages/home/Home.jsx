import React from 'react'
import { Navbar } from '../../components/navbar/Navbar'
import { Sidebar } from '../../components/sidebar/Sidebar'
import './home.scss'

export const Home = () => {
  return (
    <div className='home'>
        <Sidebar />
        <div className="homeContainer">
            <div className="homeContainer">
                <Navbar />
                home container
            </div>
        </div>
    </div>
  )
}
