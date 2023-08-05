import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../scss/LoginPage.scss';
import axios from '../axios';
import { Modal_v2 } from '../components/Modal_v2';

export function LoginPage() {
    const [newUser, setNewUser] = useState({
        email: '', password: '',
    })

    const [modal, setModal] = useState(false);
    const [modalText, setModalText] = useState('');

    const defaultData =  [
        { "id": 1, "title": "Savings", "price": 0, "bgColor": "#ff6262", "history": [] },
        { "id": 2, "title": "Donations", "price": 0, "bgColor": "#85abff", "history": [] },
        { "id": 3, "title": "Goals", "price": 0, "bgColor": "#ffb738", "history": [] }
    ];


    const {login} = useContext(AuthContext);

    const [inputType, setInputType] = useState('password');
    
    const onChangeInput = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }

    const onPasswordChange = (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
        onChangeInput(e);
    }

    const handlerEye = (e) => {
        if (e.target.classList[1].includes('slash')) {
            e.target.classList.remove('fa-eye-slash');
            e.target.classList.add('fa-eye');
            setInputType('text');
        } else {
            e.target.classList.remove('fa-eye');
            e.target.classList.add('fa-eye-slash');
            setInputType('password');
        }
    }

    const sumbitHandler = async(e) => {
        e.preventDefault();

        try {
            await axios.post('api/auth/login', newUser, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                login(response.data.token, response.data.userId, response.data.user.name, response.data.user.avatar);
            })
            .catch(err => {setModal(true); setModalText(err.response.data.message)});                
        } catch (error) {
            console.log(error);
        }


    }

    return (
        <div className='LoginPage'>

            <Modal_v2 modal={modal} setModal={setModal} modalText={modalText} />


            <div className='logo-auth'>
                <img src='/images/logo.png' alt='logo' />
            </div>

            <form onSubmit={sumbitHandler}>
                <p>Enter your email</p>
                <input
                    required
                    type='email'
                    name='email'
                    className='userEmail'
                    onChange={onChangeInput}
                    value={newUser.email}
                />

                <p>Enter your password</p>
                <div className='pinBox'>
                    <input
                        required
                        name='password'
                        type={inputType}
                        value={newUser.password}
                        onChange={onPasswordChange}
                    />
                    <i className='fa-regular fa-eye-slash' onClick={handlerEye}></i>
                </div>

                <Link className='forgotPass' to='/forgot'>Forgot password ?</Link>

                <input 
                  type='submit' 
                  value='Sign in' 
                  className='btn btnActive'
                /> 
            </form>

            <div className="btns">
                <Link to='/about'>How to use this program ?</Link>
                <Link to='/registration'>Create account ?</Link>
            </div>
        </div>
    )
}