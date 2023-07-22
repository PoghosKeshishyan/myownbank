import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../scss/AboutPage.scss';

export function AboutPage() {
    const navigate = useNavigate();
    const [aboutText, setAboutText] = useState('');
    const text = 'Hello my young friend. I want to inform you that with the help of this wonderful application you will learn how to properly handle your money. You can always find out how much money you have, how much you have spent, how much is left to save to achieve your goal.';
    let i = 0;
    let speed = 50;

    useEffect(() => { 
        typeWriter();
    }, []);

    function typeWriter() {
        if (i < text.length) {
            setAboutText(prev => prev += text.charAt(i));
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    return (
        <>
            <i className='fa-solid fa-house' onClick={() => navigate('/')} />

            <div className='AboutPage' data-aos='zoom-in'>
                <p className='aboutText'>{aboutText}</p>
            </div>
        </>
    )
}