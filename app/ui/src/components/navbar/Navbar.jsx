import React from 'react'
import './navbar.scss'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
// import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
// import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
// import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import ListOutlinedIcon from '@mui/icons-material/ListOutlined'

export const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="wrapper">
                <div className='search'>
                    <input type="text" placeholder='Search...' />
                    <SearchOutlinedIcon />
                </div>
                <div className="items">
                    <div className="item">
                        <NotificationsNoneOutlinedIcon className='icon' />
                        <div className="counter">1</div>
                    </div>
                    <div className="item">
                        <ChatBubbleOutlineOutlinedIcon className='icon' />
                        <div className="counter">2</div>
                    </div>
                    <div className="item">
                        <ListOutlinedIcon className='icon' />
                    </div>
                    <div className="item">
                        <img
                            src="https://images.pexels.com/photos/13835274/pexels-photo-13835274.jpeg?cs=srgb&dl=pexels-alyona-pastukhova-13835274.jpg&fm=jpg&_gl=1*15ty51p*_ga*MTk2Nzk0Mjk2NC4xNjY3NzgzNjM4*_ga_8JE65Q40S6*MTY2Nzc4MzYzOS4xLjEuMTY2Nzc4MzY4NC4wLjAuMA.."
                            alt=""
                            className='avatar'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
