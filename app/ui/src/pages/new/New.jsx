import './new.scss'
import { useState } from 'react'
import { Sidebar } from "../../components/sidebar/Sidebar"
import { Navbar } from "../../components/navbar/Navbar"

export const New = ({ inputs, title }) => {

    const [inputFields, setInputFields] = useState([...inputs])

    const Users = (inputFields) => {
        fetch("http://localhost:3001/api/db/users/create", {
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
        Users(inputFields)
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
                    {/* <div className="left">
                        <img src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
                    </div> */}
                    <div className="right">
                        <form onSubmit={submit}>
                            {/* <div className="formInput">
                                <label htmlFor='file'>
                                    Image: <DriveFolderUploadOutlinedIcon className='icon' />
                                </label>
                                <input type="file" id="file" onChange={event => setFile(event.target.files[0])} style={{ display: 'none' }} />
                            </div> */}
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
