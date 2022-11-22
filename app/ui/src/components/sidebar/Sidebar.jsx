import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import PsychologyIcon from '@mui/icons-material/Psychology';
import LogoutIcon from '@mui/icons-material/Logout';
// import SettingsIcon from '@mui/icons-material/Settings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="top">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">Administrativo</span>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">Principais</p>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    <p className="title">Listas</p>
                    <Link to="/users" style={{ textDecoration: "none" }}>
                        <li>
                            <GroupIcon className="icon" />
                            <span>Usuários</span>
                        </li>
                    </Link>
                    <Link to="/patients" style={{ textDecoration: "none" }}>
                        <li>
                            <HealthAndSafetyIcon className="icon" />
                            <span>Pacientes</span>
                        </li>
                    </Link>
                    <p className="title">Serviços</p>
                    <li>
                        <PsychologyIcon className="icon" />
                        <span>Fichas</span>
                    </li>
                    <Link to="/schedules"  style={{ textDecoration: "none" }}>
                        <li>
                            <CalendarMonthIcon className="icon" />
                            <span>Agendamentos</span>
                        </li>
                    </Link>
                    <li>
                        <AssessmentIcon className="icon" />
                        <span>Relatórios</span>
                    </li>
                    {/* <li>
                        <SettingsIcon className="icon" />
                        <span>Configurações</span>
                    </li> */}
                    <p className="title">Sistema</p>
                    <li>
                        <LogoutIcon className="icon" />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
