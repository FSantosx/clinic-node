import './new.scss'
import { useState } from 'react'
import { Sidebar } from "../../components/sidebar/Sidebar"
import { Navbar } from "../../components/navbar/Navbar"

export const New = ({ inputs, title, db }) => {

    const [inputFields, setInputFields] = useState([...inputs])

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

    return (
        <div className='new'>
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
    )
}
