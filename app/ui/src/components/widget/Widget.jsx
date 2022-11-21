import React from 'react'
import './widget.scss'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
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
                icon: <GroupIcon className="icon" style=
                {{ 
                    color: "crinmson", 
                    backgroundColor: 'rgba(255,0,0,0.2)' 
                }} />
            }
            break;
        case "pacients":
            data = {
                title: "PACIENTS",
                link: 'See all patients',
                counter: number,
                icon: <HealthAndSafetyIcon className="icon"  style=
                {{ 
                    color: "purple", 
                    backgroundColor: 'rgba(128,0,128,0.2)' 
                }}/>
            }
            break;
        case "logs":
            data = {
                title: "LOGS",
                link: 'See all logs',
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
                title: "REPORTS",
                link: 'See all reports',
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
