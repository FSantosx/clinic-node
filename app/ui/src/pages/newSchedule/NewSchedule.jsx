import '../new/new.scss'
import './newSchedule.scss'
import { useEffect, useState } from 'react'
import { Sidebar } from "../../components/sidebar/Sidebar"
import { Navbar } from "../../components/navbar/Navbar"


export const NewSchedule = ({ inputs, title }) => {

    const [inputFields, setInputFields] = useState([...inputs])

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

    const Save = (inputFields) => {
        inputFields.push({ id: 3, name: 'paciente', value: document.getElementById('paciente').value })
        inputFields.push({ id: 4, name:'status', value: document.getElementById('status').value})
        
        let payload = {id : '', formData : inputFields}
        
        fetch(`http://localhost:3001/api/db/schedules/create`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).catch(err => console.trace(err))
    }

    const submit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(inputFields))
        Save(inputFields)
        document.location.href = `/schedule`
    }

    const handleFormChange = (index, event) => {
        let data = [...inputs];
        data[index]["value"] = event.target.value;
        setInputFields(data);
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
                <form onSubmit={submit}>
                    <div className="bottom">
                        <div className="formInput">
                            <label>Paciente</label>
                            <select name="paciente" id="paciente">
                                {
                                    pat.map((p) => {
                                        return (
                                            <option value={p.id}>{p.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <label>Status</label>
                            <select name="status" id="status">
                                <option value="agendado" selected>agendado</option>
                                <option value="desistencia">desistencia</option>
                                <option value="remarcado">remarcado</option>
                            </select>
                        </div>
                        {inputs.map((input, index) => {
                            return (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input type={input.type} placeholder={input.placeholder} onChange={event => handleFormChange(index, event)} />
                                </div>
                            )
                        })}
                        <button onClick={submit}>Salvar Agendamento</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
