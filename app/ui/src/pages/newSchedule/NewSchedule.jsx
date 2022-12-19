import '../new/new.scss'
import './newSchedule.scss'
import { useEffect, useState } from 'react';
import useFetch from 'react-fetch-hook'
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Navbar } from "../../components/navbar/Navbar";


export const NewSchedule = ({ inputs, title }) => {

    const href = window.location.href;
    const len = href.split('/').length

    var id = ""

    if (len === 6) {
        id = href.split('/')[len - 1]
    }

    const { isLoading, error, data } = useFetch(`http://localhost:3001/api/db/schedules/get/${id}`);

    const [inputFields, setInputFields] = useState([...inputs])

    const Patients = () => {
        const [patients, setPatients] = useState([])
        useEffect(() => {
            fetch("http://localhost:3001/api/db/patients/list")
                .then(response => response.json())
                .then(data => {
                    let list = {}
                    data.forEach((item) => {
                        list[item['id']] = item
                    })
                    setPatients(list)
                })
                .catch(err => console.trace(err))
        }, [])
        return patients;
    }

    const Schedules = () => {
        const [schedules, setSchedules] = useState([])

        useEffect(() => {
            fetch("http://localhost:3001/api/db/schedules/list")
                .then(response => response.json())
                .then(data => setSchedules(data))
                .catch(err => console.trace(err))
        }, [])
        return schedules;
    }

    const Save = (inputFields) => {
        inputFields.push({ id: 3, name: 'paciente', value: document.getElementById('paciente').value })
        inputFields.push({ id: 4, name: 'status', value: document.getElementById('status').value })

        let payload = { id: '', formData: inputFields }
        console.log(payload)

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
    let Data = Schedules();

    for (let i = 0; i < Data.length; i++) {
        Data[i]['pname'] = pat[Data[i]['paciente']]['name']
    }

    const newData = <div className='new'>
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
                                Object.values(pat).map((p) => {
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
    </div>;

    if (isLoading) return "Loading ..."
    if (error) return "Error!"

    const editData = <div className='new'>
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
                            <option defaultValue={Data[0].pname}>{Data[0].pname}</option>
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
                                <input type={input.type}
                                    placeholder={input.placeholder}
                                    onChange={event => handleFormChange(index, event)}
                                    defaultValue={data}
                                />
                            </div>
                        )
                    })}
                    <input type='hidden' name='rid' id='rid' defaultValue={Data[0].id} />
                    <button onClick={submit}>Salvar Agendamento</button>
                </div>
            </form>
        </div>
    </div>

    return (
        len === 6 ? editData : newData
    )
}
