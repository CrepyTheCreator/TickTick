import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../service/store';
import { getFeedThunk, getIsLoading, getTickets } from '../../slices/feedSlice/feedSlice';
import Button from '../button/button';
import TicketElement from '../ticketElement/ticketElement';
import styles from './main.module.css';
import question from '../../assets/question.png';
import { Preloader } from '../preloader/preloader';

export default function Main () {
  const tickets = useSelector(getTickets);
  const isLoading = useSelector(getIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!tickets || tickets.length === 0) {
      dispatch(getFeedThunk())
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.commonFeatures}></div>
      <div className={styles.main}>
        <div className={styles.search}>
          <div className={styles.searchContainer}>
            <input className={styles.searchInput} type="input" placeholder='Type here to search something..'/>
          </div>
          <Button type='fill'>UpDate List</Button>
          <Button type='fill'>Search</Button>
        </div>
        <div className={styles.ticketsList}>
          {isLoading && <div className={styles.preloader}><Preloader/></div>}
          {tickets.length < 1 ? 
          <div className={styles.emptyContainer}>
            <img src={question} alt="question" className={styles.emptyImg}/>
            <div className={styles.emptyText}>
              <span className={styles.emptyTitle}>No Tickets</span>
              <span className={styles.emptyDescription}>be the first to create a new ticket.</span>
            </div>
            <Button type='fill'>Create New Ticket</Button>
          </div> : ''}
          {tickets?.map((el) => {
            return <TicketElement ticketInfo={el} key={el.id}/>
          })}
        </div>
      </div>
    </div>
  );
}
