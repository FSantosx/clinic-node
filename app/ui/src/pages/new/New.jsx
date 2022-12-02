import './new.scss'
import { useState } from 'react'
import { Sidebar } from "../../components/sidebar/Sidebar"
import { Navbar } from "../../components/navbar/Navbar"
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'

export const New = ({ inputs, title }) => {

    const [inputFields, setInputFields] = useState([...inputs])

    const submit = (e) => {
        e.preventDefault();
        console.log(inputFields)
    }

    const handleFormChange = (index, event) => {
        let data = [...inputs];
        data[index][event.target.name] = event.target.value;
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
                                        <input type={input.type} placeholder={input.placeholder} name={index.id}
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
