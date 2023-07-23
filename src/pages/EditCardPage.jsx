import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../scss/EditCardPage.scss';
import axios from '../axios';

export function EditCardPage() {
  const [card, setCard] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [bgColor, setBgColor] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadingData()
  }, []);

  const loadingData = async () => {

    try {

      await axios.get('api/cards/' + id, {
        headers: {
          'Content-Type': 'application/json',
        },
        // sa beq e gnum, ev darnum e req.query
        params: { userId: id }
      }).then(res => {
        setCard(res.data);
        setInputValue(res.data.card[0].title);
        setBgColor(res.data.card[0].bgColor);
      })


    } catch (error) {
      console.log(error);
    }


    // const response = await axios.get(`cards/${id}`);
    // setCard(response.data);
    // setInputValue(response.data.title);
    // setBgColor(response.data.bgColor);
  }

  const changeBgColorHandler = (e) => {
    if (e.target.style.backgroundColor) {
      setBgColor(e.target.style.backgroundColor);
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    card.card[0].title = inputValue;
    card.card[0].bgColor = bgColor;


     // await axios.put(`cards/${id}`, card);
    await axios.put(`api/cards/update/card/${id}`, card, {
      headers: {
        'Content-Type': 'application/json',
      }
    })

    navigate('/');
  }

  return (
    <>
      <i className='fa-solid fa-house' onClick={() => navigate('/')} />


      {card._id &&
        <div className='EditCardPage' data-aos='zoom-in'>
          <h2>Change your card details</h2>

          <form onSubmit={submitHandler}>
            <div className='card' style={{ background: bgColor }}>
              <div className='heading'>
                <input
                  type='text'
                  autoFocus
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                />

                <img src='/images/logo_black.png' alt='logo_black' />
              </div>

              <div className='chip'>
                <img src='/images/chip.jpg' alt='chip' />
                <p className='balans'>Balans <span>${card.card[0].price}</span></p>
              </div>

              <div className='code'>
                {/* <p className='chipCode'>**** **** **** 000{Number(index)+1} */}
                {/* </p> */}
                <p className='chipCode'>{card.cardNumber}</p>
                <img src='/images/nfc.png' className='nfcImg' alt='nfc' />
              </div>
            </div>

            <div className='editColors'>
              <div className='content' onClick={changeBgColorHandler} >
                <div style={{ backgroundColor: 'rgb(168 162 158)' }} />
                <div style={{ backgroundColor: 'rgb(255 255 255)' }} />
                <div style={{ backgroundColor: 'rgb(253 186 116)' }} />
                <div style={{ backgroundColor: 'rgb(252 211 77)' }} />
                <div style={{ backgroundColor: 'rgb(134 239 172' }} />
                <div style={{ backgroundColor: 'rgb(74 222 128)' }} />
                <div style={{ backgroundColor: 'rgb(52 211 153)' }} />
                <div style={{ backgroundColor: 'rgb(45 212 191)' }} />
                <div style={{ backgroundColor: 'rgb(34 211 238)' }} />
                <div style={{ backgroundColor: 'rgb(56 189 248)' }} />
                <div style={{ backgroundColor: 'rgb(96 165 250)' }} />
                <div style={{ backgroundColor: 'rgb(129 140 248)' }} />
                <div style={{ backgroundColor: 'rgb(244 114 182)' }} />
                <div style={{ backgroundColor: 'rgb(251 113 133)' }} />
              </div>
            </div>

            <button className='btn'>Save</button>
          </form>
        </div>
      }
    </>
  )
}