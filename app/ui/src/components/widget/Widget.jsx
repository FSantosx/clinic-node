import React from 'react'
import './widget.scss'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AssessmentIcon from '@mui/icons-material/Assessment';
import GroupIcon from '@mui/icons-material/Group';


export const Widget = ({ type }) => {
    let data;
    
    //todo - remove static assignment
    let number = Math.floor(Math.random() * (20 - 1) + 1)

    switch (type) {
        case "user":
            data = {
                title: "USERS",
                link: 'See all users',
                counter: number,
                icon: <GroupIcon className="icon" />
            }
            break;
        case "pacients":
            data = {
                title: "PACIENTS",
                link: 'See all patients',
                counter: number,
                icon: <HealthAndSafetyIcon className="icon" />
            }
            break;
        case "logs":
            data = {
                title: "LOGS",
                link: 'See all logs',
                counter: number,
                icon: <PsychologyIcon className="icon" />
            }
            break;
        case "reports":
            data = {
                title: "REPORTS",
                link: 'See all reports',
                counter: number,
                icon: <AssessmentIcon className="icon" />
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
                <PersonOutlinedIcon className='icon' />
            </div>
        </div>
    )
}
