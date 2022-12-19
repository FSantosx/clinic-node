import './new.scss'
import { useState } from 'react'
import { Sidebar } from "../../components/sidebar/Sidebar"
import { Navbar } from "../../components/navbar/Navbar"
import useFetch from "react-fetch-hook"



export const New = ({ inputs, title, db }) => {

    const Save = (inputFields) => {
        var obj = {}
        
        for (let i=0;i<inputFields.length;i++ ) {
            inputFields[i].value = document.getElementById( inputFields[i]['name'] ).value
        }

        obj = { id: document.getElementById('rid').value, formData: inputFields }
        
        fetch(`http://localhost:3001/api/db/${db}/create`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).catch(err => console.trace(err))
    }

    const submit = (e) => {
        e.preventDefault();
        Save(inputFields)
        window.location.href = `/${db}`;
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

    const { isLoading, error, data } = useFetch(`http://localhost:3001/api/db/${table}/get/${id}`);
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
                                    <input type={input.type} placeholder={input.placeholder} name={input.name} id={input.name}
                                        onChange={event => handleFormChange(index, event)}
                                    />
                                </div>
                            )
                        })}
                        <input type='hidden' name='rid' id='rid' defaultValue='' />
                        <button onClick={submit}>Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    if (isLoading) return "Loading ..."
    if (error) return newData

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
                                    <input type={input.type} placeholder={input.placeholder} name={input.name} id={input.name}
                                        defaultValue={data[0][input.name]} 
                                        onChange={event => handleFormChange(index, event)}                                        
                                    />
                                </div>
                            )
                        })}
                        <input type='hidden' name='rid' id='rid' defaultValue={data[0].id} />
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
