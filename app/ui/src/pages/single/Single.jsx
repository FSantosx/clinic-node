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
        }, [table,id])
        
        return Preview;
    }

    const data = Preview(table, id);    
    
    const graph = <div className="right">        
        <Chart aspect={3 / 1} title='Atendimentos dos ultimos 6 meses' last ={data[0]?.last} />
    </div>
    const call = <div className="bottom">
        <h1 className="title">Ultimos Atendimentos</h1>
        <TableList />
    </div>
    const crm = <span className="itemKey">CRM: </span>
    const cpf = <span className="itemKey">CPF: </span>

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
                                <h1 className="itemTitle">{data[0]?.name}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Email: </span>
                                    <span className="itemValue">{data[0]?.email}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Telefone: </span>
                                    <span className="itemValue">{data[0]?.tel}</span>
                                </div>
                                <div className="detailItem">
                                    {table === "doctors" || table === "tech" ? crm : cpf }
                                    <span className="itemValue">{data[0]?.cpf || data[0]?.crm }</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Endereço: </span>
                                    <span className="itemValue">{data[0]?.adress}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Idade </span>
                                    <span className="itemValue">{data[0]?.age}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Status </span>
                                    <span className="itemValue">{data[0]?.status}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {table === "users" ? null : graph}
                </div>
                {/* table === "users" ? null : call */}
            </div>
        </div>
    )
}
