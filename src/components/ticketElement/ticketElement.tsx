import styles from './ticketElement.module.css';
import eye from '../../assets/eye.svg';
import note from '../../assets/note.svg';
import { Link } from 'react-router-dom';
import type { Ticket } from '../../utils/types';
import { ticketSwitch } from '../../utils/functions';

export interface ITicketProps {
  ticketInfo: Ticket;
}


export default function ticketElement (props: ITicketProps) {
  return (
    <Link to={`/tickets/${props.ticketInfo.id}`} state={props.ticketInfo}>
      <div className={styles.card}>
        <div className={styles.info}>
          <img src={ticketSwitch(props.ticketInfo.answers, props.ticketInfo.isTicketClosed, 'logo')} alt="Логотип вопроса" />
          <div className={styles.cardText}>
            <div className={styles.ticketHeader}>
              <span style={{color: `#${ticketSwitch(props.ticketInfo.answers, props.ticketInfo.isTicketClosed, 'color')}`}}>{props.ticketInfo.title}</span>
              <span>{`#${props.ticketInfo.id} by @${props.ticketInfo.author}`}</span>
            </div>
            <span className={styles.description}>{props.ticketInfo.description}</span>
          </div>
        </div>
        <div className={styles.counters}>
          <div className={styles.countContainer}>
            <img src={eye} alt="eye" />
            <span>{props.ticketInfo.views}</span>
          </div>
          <div className={styles.countContainer}>
            <img src={note} alt="note" />
            <span>{props.ticketInfo.answers}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
