import '../new/new.scss'
import './newSchedule.scss'
import { useEffect, useState } from 'react'
import { Sidebar } from "../../components/sidebar/Sidebar"
import { Navbar } from "../../components/navbar/Navbar"


export const NewSchedule = ({ inputs, title }) => {

    const Patients = () => {
        const [patients, setPatients] = useState([])
        useEffect(() => {
            fetch("http://localhost:3001/api/db/patients/list")
                .then(response => response.json())
                .then(data => {
                    setPatients(data)
                })
                .catch(err => console.trace(err))
        }, [])
        return patients;
    }

    const pat = Patients();

    return (
        <div className='new'>
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <form>
                    <div className="bottom">
                        <div className="formInput">
                            <label>Paciente</label>
                            <select name="paciente" id="paciente">
                                {
                                    pat.map(p => {
                                        return (
                                            <option value={p.name}>{p.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <label>Status</label>
                            <select name="status" id="status">
                                <option value="Teste1" selected>agendado</option>
                                <option value="Teste2">desistencia</option>
                                <option value="Teste2">remarcado</option>
                            </select>
                        </div>
                        {inputs.map((input) => {
                            return (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input type={input.type} placeholder={input.placeholder} />
                                </div>
                            )
                        })}
                        <button>Salvar Agendamento</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
