import React, { useEffect, useState, useRef, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Modal_v1 } from './Modal_v1';
import axios from '../axios';
import '../scss/Header.scss';
import { AuthContext } from '../context/AuthContext';

export function Header() {
    const [user, setUser] = useState({});
    const [modal, setModal] = useState(false);
    const [menuOpened, setMenuOpened] = useState(false);
    const [settingsOpened, setSettingsOpened] = useState(false);
    const [inputChecked, setInputChecked] = useState(false);
    const navRef = useRef(null);
    const settRef = useRef(null);

    const {name, avatar, logout} = useContext(AuthContext);

    useEffect(() => {
        loadingData();
        window.addEventListener('mousedown', handleClickOutSide);
    }, [])

    async function loadingData() {
        // const response = await axios.get('user');
        // setUser(response.data);

        // loading Display Theme
        if (localStorage.getItem('myOwnBank_theme') === 'dark') {
            document.querySelector('body').classList.add('active');
            setInputChecked(true);
        }
    }

    const handleClickOutSide = (e) => {
        try {
            if (!navRef.current.contains(e.target)) {
                if (e.target.className !== 'img') setMenuOpened(false);
                setTimeout(() => setMenuOpened(false), 100);
            };
        } catch { }

        try {
            if (!settRef.current.contains(e.target.parentElement)) {
                setSettingsOpened(false);
            };
        } catch { }

        try {
            if (e.target.tagName === 'A') {
                setTimeout(() => setSettingsOpened(false), 100);
            };
        } catch { }
    }

    const darkModeFunc = () => {
        document.querySelector('body').classList.toggle('active');

        if (localStorage.getItem('myOwnBank_theme') !== 'dark') {
            localStorage.setItem('myOwnBank_theme', 'dark');
        } else {
            localStorage.setItem('myOwnBank_theme', 'light');
        };

        setInputChecked(!inputChecked);
    }

    return (
        <React.Fragment>
            <div className={modal ? 'modal activeModal' : 'modal'}>
                <div className='modalBackground' onClick={() => setModal(false)}></div>

                <div className='modalBody'>
                    <p>Are you sure you want to log out of your account?</p>

                    <div className='buttonsModal'>
                        <button onClick={logout} className='modal_btn_yes'>Yes</button>
                        <button className='modal_btn_cancel' onClick={() => setModal(false)}>Cancel</button>
                    </div>
                </div>
            </div>

            <header>
                <i 
                  ref={navRef} 
                  className='fa-solid fa-bars' 
                  onClick={() => setMenuOpened(!menuOpened)} 
                />

                <nav className={menuOpened ? 'menuBar activeMenuBar' : 'menuBar'}>
                    <NavLink to='/cash'>
                        <i className='fa-solid fa-dollar-sign'></i>
                        <p>Cash</p>
                    </NavLink>

                    <NavLink to='/transfer'>
                        <i className='fa-solid fa-rotate'></i>
                        <p>Transfer</p>
                    </NavLink>

                    <NavLink to='/about'>
                        <i className='fa-solid fa-file-lines'></i>
                        <p>About</p>
                    </NavLink>

                    <NavLink to='#' onClick={() => setSettingsOpened(!settingsOpened)}>
                        <i className='fa-solid fa-gear'></i>
                        <p>Settings</p>
                    </NavLink>

                    <NavLink to='/support'>
                        <i className='fa-solid fa-envelope'></i>
                        <p>Support</p>
                    </NavLink>

                    <NavLink to='#' onClick={() => setModal(!modal)}>
                        <i className='fa-solid fa-right-from-bracket'></i>
                        <p>Sign Out</p>
                    </NavLink>
                </nav>

                <div ref={settRef} className={settingsOpened ? 'settingsBar activeMenuBar' : 'settingsBar'}>
                    <NavLink to='/edit/profile'>My Profile</NavLink>

                    <div className='switch'>
                        Dark mode
                        <input type='checkbox' className='settInput' checked={inputChecked} onChange={darkModeFunc} />
                    </div>
                </div>

                <div className='user'>
                    <div className='logo'>
                        <Link to='/'> <img src='/images/logo.png' alt='logo' /> </Link>
                    </div>

                    <div className='userName'>
                        <p>{name}</p>

                        <div className='avatar'>
                            <i className={avatar}></i>
                        </div>
                    </div>
                </div>
            </header>
        </React.Fragment>
    )
}
