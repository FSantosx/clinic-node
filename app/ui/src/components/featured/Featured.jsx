import './featured.scss'
import 'react-circular-progressbar/dist/styles.css'
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { CircularProgressbar } from 'react-circular-progressbar'
import KeyboardArrowDownIcon  from '@mui/icons-material/KeyboardArrowDown';

export const Featured = () => {
    return (
        <div className='featured'>
            <div className="top">
                <h1 className='title'>Atendimentos</h1>
                <MoreVertIcon fontSize='small' />
            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar value={70} text="70%" strokeWidth={5} />
                </div>
                <p className="title">Total Atendimentos hoje</p>
                <p className="amount">12</p>
                <p className="desc">Atendimentos em andamento só serão contabilizados após o encerramento da ficha</p>
                <div className="summary">
                    <div className="item">
                        <div className="itemTitle">Do dia</div>
                        <div className="itemResult">
                            <KeyboardArrowDownIcon fontSize="small"/>
                            <div className="resultAmount">
                                50
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Semana passada</div>
                        <div className="itemResult">
                            <KeyboardArrowDownIcon fontSize="small"/>
                            <div className="resultAmount">
                                50
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Ultimo mês</div>
                        <div className="itemResult">
                            <KeyboardArrowDownIcon fontSize="small"/>
                            <div className="resultAmount">
                                50
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
