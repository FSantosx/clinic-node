import '../new/new.scss'
import { useState } from 'react'
import { Sidebar } from "../../components/sidebar/Sidebar"
import { Navbar } from "../../components/navbar/Navbar"
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'

export const NewSchedule = ({ inputs, title }) => {

    return (
        <div className='new'>
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <label>Paciente</label>
                        <select name="paciente" id="paciente">
                            <option value="Teste1">Teste1</option>
                            <option value="Teste2">Teste2</option>
                        </select>
                        <label>Status</label>
                        <select name="status" id="status">
                            <option value="Teste1" selected>agendado</option>
                            <option value="Teste2">desistencia</option>
                            <option value="Teste2">remarcado</option>
                        </select>
                    </div>
                    <div className="right">
                        <form>
                            {inputs.map((input) => {
                                return (
                                    <div className="formInput" key={input.id}>
                                        <label>{input.label}</label>
                                        <input type={input.type} placeholder={input.placeholder} />
                                    </div>
                                )
                            })}
                            <button>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
