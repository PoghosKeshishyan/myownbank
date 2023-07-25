import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from '../context/AuthContext';
import axios from '../axios';

export function TransferToFriendPage() {
    const [modal, setModal] = useState(false);
    const [modalText, setModalText] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();
    const { userId } = useContext(AuthContext);
    const [editInput, setEditInput] = useState(true);

    const [input, setInput] = useState('');

    const [cards, setCards] = useState([]);
    const [card, setCard] = useState({});

    useEffect(() => {
        loadingData()
    }, []);

    const onChangeSelect = (e) => {
        const res = cards.filter(el => el._id == e.target.value);
        setCard(res[0]);
        setEditInput(false);
    }

    const loadingData = async () => {
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

    const submitHandler = async(e) => {
        e.preventDefault();

        if (Number(input) > card.card[0].price) {
            setModal(true);
            return setModalText('You cannot select a number greater than the value.');
        }


        await axios.post('api/auth/transfer/user/' + card._id, {friendUserId: id, input, card}, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
            navigate('/')
        })
    }

    return (
        <div className="TransferToFriendPage">
            <i className="fa-solid fa-house" onClick={() => navigate('/')} />

            <div className={modal ? 'modal activeModal' : 'modal'}>
                <div className='modalBackground' onClick={() => setModal(false)}></div>

                <div className='modalBody'>
                    <p>{modalText}</p>
                    <button className="modal_btn_yes" onClick={() => setModal(false)}>Ok</button>
                </div>
            </div>

            <p>Write how much money you want to transfer to your friend's account.</p>
            <h2>
                <i className="fa-solid fa-triangle-exclamation"></i>
                Warning
            </h2>

            <p>Your transferred amount will be transferred to your friend's "Savings" card.</p>

            <form onSubmit={submitHandler}>
                <p>Choose from which of your account the money should be transferred.</p>
                <select
                    className='selectTransfer'
                    defaultValue="Accounts"
                    onChange={onChangeSelect}
                >
                    <option value="Accounts" disabled="disabled">Accounts</option>
                    {cards.map((el, index) => <option value={el._id} key={el._id}>{el.card[0].title}</option>)}
                </select>

                <p>Amount of money</p>
                <input type="number" value={input} disabled={editInput} onChange={e => setInput(e.target.value)} />
                <input type="submit" value="Send" className="btn" />
            </form>
        </div>
    )
}
