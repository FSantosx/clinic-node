import React from 'react'
import './widget.scss'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AssessmentIcon from '@mui/icons-material/Assessment';
import GroupIcon from '@mui/icons-material/Group';


export const Widget = ({ type, len }) => {
    let data;

    //todo - remove static assignment
    let number = len

    switch (type) {
        case "user":
            data = {
                title: "USUÁRIOS",
                link: 'Listar usuários',
                counter: number,
                icon: <GroupIcon className="icon" style=
                {{ 
                    color: "crinmson", 
                    backgroundColor: 'rgba(255,0,0,0.2)' 
                }} />
            }
            break;
        case "pacients":
            data = {
                title: "PACIENTES",
                link: 'Listar pacientes',
                counter: number,
                icon: <HealthAndSafetyIcon className="icon"  style=
                {{ 
                    color: "purple", 
                    backgroundColor: 'rgba(128,0,128,0.2)' 
                }}/>
            }
            break;
        case "Schedules":
            data = {
                title: "AGENDAMENTOS",
                link: 'Listar Agendamentos',
                counter: number,
                icon: <PsychologyIcon className="icon"  style=
                {{ 
                    color: "green", 
                    backgroundColor: 'rgba(0,128,0,0.2)' 
                }}/>
            }
            break;
        case "reports":
            data = {
                title: "RELATÓRIOS",
                link: 'Listar relatórios',
                counter: number,
                icon: <AssessmentIcon className="icon"  style=
                {{ 
                    color: "goldenrod", 
                    backgroundColor: 'rgba(218,165,32,0.2)' 
                }}/>
            }
            break;
        default:
            break;
    }

    return (
        <div className='widget'>
            <div className="left">
                <span className='title'>{data.title}</span>
                <span className='counter'>{data.counter}</span>
                <span className='link'>{data.link}</span>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUpIcon />
                    20%
                </div>
                { data.icon }
            </div>
        </div>
    )
}
