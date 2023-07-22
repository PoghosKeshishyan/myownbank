import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../scss/ForgotPinCodePage.scss';

export function ForgotPinCode() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

        // const result = localStorage.getItem('myOwnBank_userPinCode');
        // setPinInLocal(result);


    }, [])

    return (
        <div className='ForgotPinCode' data-aos='zoom-in'>
            <i className='fa-solid fa-circle-left' onClick={() => navigate(-1)} style={{top: '20px'}}/>

            <form action='forgotPinCode.php' method='POST'>
                <p>Forgot your pin code? <br /> Enter your email.</p>
                <span>We will try to respond to your letter.</span>

                <input 
                  required 
                  type='email' 
                  name='email' 
                  value={email} 
                  placeholder='example@gmail.com' 
                  onChange={e => setEmail(e.target.value)} 
                />
 
                <input type='submit' value='Send' className={email.includes('@') ? ' btn btnActive' : ' btn btnVisible'} />
            </form>
        </div>
    )
}