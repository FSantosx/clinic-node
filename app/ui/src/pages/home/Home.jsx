import { Chart } from '../../components/chart/Chart'
import { Featured } from '../../components/featured/Featured'
import { Navbar } from '../../components/navbar/Navbar'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { TableList } from '../../components/table/TableList'
import { Widget } from '../../components/widget/Widget'
import { useState, useEffect } from 'react'
import './home.scss'
import { Login } from '../login/Login';

export const Home = () => {

    const Users = () => {
        const [users, setUsers] = useState([])

        useEffect(() => {
            fetch("http://localhost:3001/api/db/users/list").then(response => response.json()).then(data => setUsers(data)).catch(err => console.trace(err))
        }, [])
        return users;
    }

    const Patients = () => {
        const [patients, setPatients] = useState([])
        
        useEffect(() => {
            fetch("http://localhost:3001/api/db/patients/list").then(response => response.json()).then(data => setPatients(data)).catch(err => console.trace(err))
        }, [])
        return patients;
    }

    const Schedules = () => {
        const [schedules, setSchedules] = useState([])
        
        useEffect(() => {
            fetch("http://localhost:3001/api/db/schedules/list").then(response => response.json()).then(data => setSchedules(data)).catch(err => console.trace(err))
        }, [])
        return schedules;
    }
    
    const UsersLen = Users().length
    const PatientsLen = Patients().length
    const SchedulesLen = Schedules().length
    

    if (!sessionStorage.getItem('tok')) {
        return <Login />
    }

    return (
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="widgets">
                    <Widget type="user" len={UsersLen}/>
                    <Widget type="pacients" len={PatientsLen} />
                    <Widget type="Schedules" len={SchedulesLen}/>
                    <Widget type="reports" len={0}/>
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
