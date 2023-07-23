import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../scss/TransferPage.scss';
import axios from '../axios';
import { AuthContext } from '../context/AuthContext';

export function TransferPage() {
  const [modal, setModal] = useState(false);
  const [modalText, setModalText] = useState('');

  const [cards, setCards] = useState([]);
  const [cardFrom, setCardFrom] = useState({});
  const [cardTo, setCardTo] = useState({});


  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const {userId} = useContext(AuthContext);

  useEffect(() => {loadingDatas()}, []);
  const handleModalYesBtn = () => setModal(false);


  const onChangeSelectFrom = (e) => {
    const res = cards.filter(el => el._id == e.target.value);
    setCardFrom(res[0]);
  }

  const onChangeSelectTo = (e) => {
    const res = cards.filter(el => el._id == e.target.value);
    setCardTo(res[0]);
  }


  const loadingDatas = async() => {
    // if (localStorage.getItem('myOwnBank_data')) {
    //   const result = JSON.parse(localStorage.getItem('myOwnBank_data'));
    //   setDatas(result);
    // }


    try {

      await axios.get('api/cards/', {
        headers: {
          'Content-Type': 'application/json',
        },
        // sa beq e gnum, ev darnum e req.query
        params: { userId }
      }).then(res => {
        setCards(res.data);
      })
      

    } catch (error) {
      console.log(error);
    }


  };

  const onSubmit = async(e) => {
    e.preventDefault();

    if (!input || input < 0) {
      setModal(true);
      return setModalText('The field must be filled and the value of the number must be greater than 0.');
    }

    if (input[0] === '0' && input[1] !== '.') {
      setModal(true);
      return setModalText('After 0 you need to add "." or ","');
    }

    if (cardFrom.card[0].price < input) {
      setModal(true);
      return setModalText('You cannot select a number greater than the value.');
    }

    if (cardFrom.card[0].title === cardTo.card[0].title) {
      setModal(true);
      return setModalText('You cannot transfer to the same card. Change one of the cards.');
    }

    cardFrom.card[0].price -= input;
    cardTo.card[0].price += Number(input);
    
    const today = new Date().toISOString().split('T')[0];
    const newFromHistory = [`to ${cardTo.card[0].title}`, today, `-$${input}`];
    const newToHistory = [`from ${cardFrom.card[0].title}`, today, `+$${input}`];

    cardFrom.card[0].history = [newFromHistory, ...cardFrom.card[0].history];
    cardTo.card[0].history = [newToHistory, ...cardTo.card[0].history];


    await axios.put(`api/cards/cash/card/${cardFrom._id}`, {card: cardFrom}, {
      headers: {
        'Content-Type': 'application/json',
      }
    })

    await axios.put(`api/cards/cash/card/${cardTo._id}`, {card: cardTo}, {
      headers: {
        'Content-Type': 'application/json',
      }
    })

    // localStorage.setItem('myOwnBank_data', JSON.stringify(datas));
    navigate('/');
  }



  return (
    <>
      <i className="fa-solid fa-house" onClick={() => navigate('/')} />

      <div className={modal ? 'modal activeModal' : 'modal'}>
        <div className='modalBackground' onClick={() => setModal(false)}></div>

        <div className='modalBody'>
          <p>{modalText}</p>
          <button className="modal_btn_yes" onClick={handleModalYesBtn}>Yes</button>
        </div>
      </div>

      <div className="TransferPage">
        <form onSubmit={onSubmit}>
          <div className="box">
            <p className='text'>From</p>

            <select
              className='selectTransfer'
              defaultValue="Accounts"
              onChange={onChangeSelectFrom}
            >
              <option value="Accounts" disabled="disabled">Accounts</option>
              {cards.map((el, index) => <option value={el._id} key={el._id}>{el.card[0].title}</option>)}
            </select>
          </div>

          <div className="box">
            <p className='text'>To</p>

            <select
              className='selectTransfer'
              defaultValue="Accounts"
              onChange={onChangeSelectTo}
            >
              <option value="Accounts" disabled="disabled">Accounts</option>
              {cards.map((el, index) => <option value={el._id} key={el._id}>{el.card[0].title}</option>)}
            </select>
          </div>

          <div className="box">
            <p className='text'>Amount</p>

            <input
              type="number"
              className='inputTransfer'
              value={input}
              placeholder='0.00'
              onChange={e => setInput(e.target.value)}
            />
          </div>

          <button className='btn'>Send</button>
        </form>
      </div>

    </>
  )
}

