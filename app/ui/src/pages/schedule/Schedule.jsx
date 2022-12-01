import './schedule.scss'
import { Navbar } from '../../components/navbar/Navbar'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { DatatableSchedules } from "../../components/datatableSchedules/DatatableSchedules"

export const Schedule = () => {
    return (
        <div className='schedules'>
            <Sidebar />
            <div className="scheduleContainer">
                <Navbar />
                <DatatableSchedules title={Schedule.name.toLowerCase()}/>
            </div>
        </div>
    )
}
