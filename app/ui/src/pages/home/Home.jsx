import { Chart } from '../../components/chart/Chart'
import { Featured } from '../../components/featured/Featured'
import { Navbar } from '../../components/navbar/Navbar'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { TableList }  from '../../components/table/TableList'
import { Widget } from '../../components/widget/Widget'
import { useState } from 'react'
import './home.scss'
import { Login } from '../login/Login';


export const Home = () => {

    if(!sessionStorage.getItem('tok')){
        return <Login />
    }

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
                <div className="charts">
                    <Featured />
                    <Chart />
                </div>
                <div className="listContainer">
                    <div className="listTitle">
                        Últimos atendimentos
                    </div>
                    <TableList />
                </div>
            </div>
        </div>
    )
}
