import styles from './ticketHeader.module.css'
import Button from '../button/button';
import { ticketSwitch } from '../../utils/functions';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../service/store';
import { getUser } from '../../slices/userSlice/userSlice';
import { deleteTicketApi, toggleTicketStatus } from '../../utils/api';
import { getTicketByIdThunk } from '../../slices/feedSlice/feedSlice';


export interface ITicketHeaderProps {
  isCompleted: boolean;
  answers: number;
  title: string;
  id: number;
  author: string;
  isClose: boolean;
}

export default function TicketHeader ({isCompleted, answers, id, title, author, isClose}: ITicketHeaderProps) {
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <img src={ticketSwitch(answers, isCompleted, 'logo')} alt="logo" className={styles.statusImg}/>
        <div className={styles.ticketInfo}>
          <div className={styles.titleText}>
            <span>{title}</span>
            <span className={styles.id}>{`#${id}`}</span>
          </div>
          <div className={styles.status} style={{backgroundColor: `#${ticketSwitch(answers, isCompleted, 'color')}`}}>
            <span>{ticketSwitch(answers, isCompleted, 'text')}</span>
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        {author === user.name ?<>
        <Button type='fill' onClick={() => {
          deleteTicketApi(String(id))
          .then((data) => {if(data.success) navigate('/')})
          .catch((err) => console.log(err))
        }}>Delete Ticket</Button>
        <Button type='fill' onClick={() => {
          toggleTicketStatus(String(id), !isClose)
            .then((data) => {
              if(data.success) dispatch(getTicketByIdThunk(id))
              })
            .catch((err) => {console.log(err)})
        }}>{isClose ? 'open Ticket' : 'Close Ticket'}</Button>
        </>: null}
        <Button type='fill' onClick={() => {navigate('/tickets')}}>Create New</Button>
      </div>
    </div>
  );
}
