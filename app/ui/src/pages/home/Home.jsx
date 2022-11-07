import React from 'react'
import { Navbar } from '../../components/navbar/Navbar'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Widget } from '../../components/widget/Widget'
import './home.scss'

export const Home = () => {
    return (
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="widgets">
                    <Widget type="user" />
                    <Widget type="pacients" />
                    <Widget type="logs" />
                    <Widget type="reports" />
                </div>
            </div>
        </div>
    )
}
