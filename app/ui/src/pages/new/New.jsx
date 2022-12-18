import './new.scss'
import { useState, useEffect } from 'react'
import { Sidebar } from "../../components/sidebar/Sidebar"
import { Navbar } from "../../components/navbar/Navbar"



export const New = ({ inputs, title, db }) => {

    const Save = (inputFields) => {
        fetch(`http://localhost:3001/api/db/${db}/create`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputFields)
        }).catch(err => console.trace(err))
    }

    const submit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(inputFields))
        Save(inputFields)
    }

    const handleFormChange = (index, event) => {
        let data = [...inputs];
        data[index]["value"] = event.target.value;
        setInputFields(data);
    }

    const href = window.location.href;
    const len = href.split('/').length

    var table = "";
    var id = ""

    if (len === 6) {
        table = href.split('/')[len - 3]
        id = href.split('/')[len - 1]
    }

    const Edit = (table, id) => {
        const [edit, setEdit] = useState()
        fetch(`http://localhost:3001/api/db/${table}/get/${id}`)
            .then(response => response.json())
            .then(data => setEdit(data))
            .catch(err => console.trace(err))
        return edit
    }

    const dbData = Edit(table, id);
    const [inputFields, setInputFields] = useState([...inputs])

    const newData = <div className='new'>
        <Sidebar />
        <div className="newContainer">
            <Navbar />
            <div className="top">
                <h1>{title}</h1>
            </div>
            <div className="bottom">
                <div className="right">
                    <form onSubmit={submit}>
                        {inputs.map((input, index) => {
                            return (
                                <div className="formInput" key={index}>
                                    <label>{input.label}</label>
                                    <input type={input.type} placeholder={input.placeholder} name={input.name}
                                        onChange={event => handleFormChange(index, event)}
                                    />
                                </div>
                            )
                        })}
                        <button onClick={submit}>Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    const editData = <div className='new'>
        <Sidebar />
        <div className="newContainer">
            <Navbar />
            <div className="top">
                <h1>{title}</h1>
            </div>
            <div className="bottom">
                <div className="right">
                    <form onSubmit={submit}>
                        {inputs.map((input, index) => {
                            return (
                                <div className="formInput" key={index}>
                                    <label>{input.label}</label>
                                    <input type={input.type} placeholder={input.placeholder} name={input.name}
                                       value={dbData[input.name]} onChange={event => handleFormChange(index, event)}
                                    />
                                </div>
                            )
                        })}
                        <button onClick={submit}>Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    return (
        len === 6 ? editData : newData
    )
}
