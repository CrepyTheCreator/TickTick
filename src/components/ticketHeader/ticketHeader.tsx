import styles from './ticketHeader.module.css'
import Button from '../button/button';
import { ticketSwitch } from '../../utils/functions';


export interface ITicketHeaderProps {
  isCompleted: boolean;
  answers: number;
  title: string;
  id: number;

}

export default function TicketHeader ({isCompleted, answers, id, title}: ITicketHeaderProps) {

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
            <span>Closed</span>
          </div>
        </div>
      </div>
      <Button type='fill'>Create New</Button>
    </div>
  );
}
