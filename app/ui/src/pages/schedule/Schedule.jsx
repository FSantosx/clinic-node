import './schedule.scss'
import { Navbar } from '../../components/navbar/Navbar'
import { Sidebar } from '../../components/sidebar/Sidebar'

export const Schedule = () => {
    return (
        <div className='schedules'>
            <Sidebar />
            <div className="scheduleContainer">
                <Navbar />
                Agendamentos
            </div>
        </div>
    )
}
