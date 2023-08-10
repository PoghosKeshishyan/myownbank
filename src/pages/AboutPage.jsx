import { useNavigate } from 'react-router-dom';
import '../scss/AboutPage.scss';
import { RWebShare } from "react-web-share";


export function AboutPage() {
    const navigate = useNavigate();

    return (
        <>
            <i className='fa-solid fa-house' onClick={() => navigate('/')} />

            <div className='AboutPage' data-aos='zoom-in'>
                <p className='aboutText'>Hello my young friend. I want to inform you that with the help of this wonderful application you will learn how to properly handle your money. You can always find out how much money you have, how much you have spent, how much is left to save to achieve your goal.</p>

                {/* ======= on share application ======= */}
                <div className='shareApp'>
                    <p>You can share this app with your friends.</p>

                    <RWebShare
                        data={{
                            title: "My Own Bank",
                            url: "https://myownbank.pro",
                            text: "My Own Bank",
                        }}
                    >
                        <div className='shareBtn'>
                            <i className="fa-solid fa-share-nodes"></i>
                            <p>Share</p>
                        </div>
                    </RWebShare>
                </div>
            </div>
        </>
    )
}