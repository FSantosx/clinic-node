import './single.scss'
import { useEffect, useState } from 'react'
import { Sidebar } from "../../components/sidebar/Sidebar"
import { Navbar } from "../../components/navbar/Navbar"
import { Chart } from '../../components/chart/Chart'
import { TableList } from '../../components/table/TableList'

export const Single = () => {
    
    const length = window.location.href.split('/').length
    const table = window.location.href.split('/')[length - 2]
    const id = window.location.href.split('/')[length - 1]

    const Preview = (table, id) => {
        const [Preview, setPreview] = useState([])

        useEffect(() => {
            fetch(`http://localhost:3001/api/db/${table}/get/${id}`).then(response => response.json()).then(data => setPreview(data)).catch(err => console.trace(err))
        }, [])
        return Preview;
    }

    const data = Preview(table, id)

    return (
        <div className='single'>
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        <div className="editButtom">Editar</div>
                        <h1 className="title">Informações</h1>
                        <div className="item">
                            <div className="datails">
                                <h1 className="itemTitle"> Jon Snow</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Email: </span>
                                    <span className="itemValue">jonsnow@westeros.com</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Telefone: </span>
                                    <span className="itemValue">+55(25)9999-9999</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Endereço: </span>
                                    <span className="itemValue">Muralha, portão 2</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <Chart aspect={3 / 1} title='Atendimentos dos ultimos 6 meses' />
                    </div>
                </div>
                <div className="bottom">
                    <h1 className="title">Ultimos Atendimentos</h1>
                    <TableList />
                </div>
            </div>
        </div>
    )
}
