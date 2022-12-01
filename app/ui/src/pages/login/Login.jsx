import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import './login.scss'
import { Home } from '../home/Home';
import { WindowSharp } from '@mui/icons-material';


export const Login = ({ setToken="" }) => { 
    
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = event => {      
      event.preventDefault();       
      
      if(user === 'santos' && pass === '12345') {
          setToken = "0ue023ud02ud0293ud";
          sessionStorage.setItem('tok', setToken);
          window.location.href = '/';
      } else {
          let e = document.getElementsByClassName('message')[0];
          e.textContent = "Usuário ou senha inválidos! Tente novamente."
      }

      setUser('');
      setPass('');
    };

    return (
        <div className='login'>
            <div className="loginContainer">
                <div className="top">
                    <h1>Seja bem vindo a Clínica!</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={handleSubmit}>                            
                            <div className="formInput" key="user">
                                <label>usuário</label>
                                <input type="text" placeholder="Insira seu usuário..." onChange={event => setUser(event.target.value)} value={user} />
                            </div>

                            <div className="formInput" key="pass">
                                <label>senha:</label>
                                <input type="password" placeholder="" onChange={event => setPass(event.target.value)} value={pass} />
                            </div>
                            <div className='message'></div>
                            <div className="button"><button type="submit">Entrar</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
