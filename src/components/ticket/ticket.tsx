import styles from './ticket.module.css';
import sucess from '../../assets/sucess.svg';
import pending from '../../assets/pending.svg';
import warn from '../../assets/warn.svg';

export interface ITicketProps {
  ticketInfo: {
    id: number,
    title: string,
    author: string,
    desctiption: string,
    views: number,
    answers: number,
    isTicketClosed: boolean
  }
}

export default function Ticket (props: ITicketProps) {
  const ticketSwitch = (value: number, isClosed: boolean, type: 'logo' | 'color') => {
    if (type === 'logo') {
      return isClosed ? sucess : value > 0 ? pending : warn;
    } else {
      return isClosed ? '008828' : value > 0 ? '887F00' : 'BF0000';
    }
  }
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <img src={ticketSwitch(props.ticketInfo.answers, props.ticketInfo.isTicketClosed, 'logo')} alt="Логотип вопроса" />
      </div>
      <div className={styles.counters}></div>
    </div>
  );
}
