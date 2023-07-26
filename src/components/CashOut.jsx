import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal_v2 } from './Modal_v2';
import axios from '../axios';
import { AuthContext } from '../context/AuthContext';

export function CashOut() {
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState({});
  const [modal, setModal] = useState(false);
  const [editInput, setEditInput] = useState(true);
  const [modalText, setModalText] = useState('');
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const {userId} = useContext(AuthContext);

  useEffect(() => {
    loadingData()
  }, []);

  const loadingData = async () => {
    // const response = await axios.get('cards');
    // setCards(response.data);


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

  const onChangeSelect = (e) => {
    const res = cards.filter(el => el._id == e.target.value);
    setCurrentCard(res[0]);
    setEditInput(false);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!input || input < 0) {
      setModal(true);
      return setModalText('The field must be filled and the value of the number must be greater than 0.');
    }

    if (input[0] === 0 && input[1] !== '.') {
      setModal(true);
      return setModalText('After 0 you need to add "." or ', '');
    }

    if (Number(input) > currentCard.price) {
      setModal(true);
      return setModalText('You cannot select a number greater than the value.');
    }

    const today = new Date().toISOString().split('T')[0];
    const newHistory = ['Cash Out', today, `-$${input}`];

    currentCard.card[0].price -= Number(input);
    currentCard.card[0].history = [newHistory, ...currentCard.card[0].history];

    // await axios.put(`cards/${currentCard.id}`, currentCard);

    await axios.put(`api/cards/cash/card/${currentCard._id}`, {card: currentCard}, {
      headers: {
        'Content-Type': 'application/json',
      }
    })

    navigate('/');
  }


  return (
    <>
      <Modal_v2 modal={modal} setModal={setModal} modalText={modalText} />

      <form className='cashForm' onSubmit={onSubmit} data-aos='zoom-in'>
        <select className='cashInputSelect' defaultValue='Accounts' onChange={onChangeSelect}>
          <option defaultValue="Accounts" disabled>Accounts</option>

          {
            cards.map(el => <option key={el._id} value={el._id}>
              {el.card[0].title}
            </option>)
          }
        </select>

        <input
          type='number'
          value={input}
          placeholder='0.00'
          disabled={editInput}
          className='cashInputText'
          onChange={e => setInput(e.target.value)}
        />

        <button className='cashInputButton'>Out</button>
      </form>
    </>
  )
}






