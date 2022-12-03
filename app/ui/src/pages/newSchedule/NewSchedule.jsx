import '../new/new.scss'
import './newSchedule.scss'
import { Sidebar } from "../../components/sidebar/Sidebar"
import { Navbar } from "../../components/navbar/Navbar"

export const NewSchedule = ({ inputs, title }) => {

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
