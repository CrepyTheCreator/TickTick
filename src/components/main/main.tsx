import Ticket from '../ticket/ticket';
import styles from './main.module.css'

export default function Main () {
  const exampleTicket = [{
    id: 211,
    title: 'Some completed ticket',
    author: 'dell223',
    desctiption: 'Some piece of desc....',
    views: 69,
    answers: 0,
    isTicketClosed: false
  }];
  return (
    <div className={styles.container}>
      <div className={styles.commonFeatures}></div>
      <div className={styles.main}>
        <div className={styles.serach}></div>
        <div className={styles.ticketsList}>
          {exampleTicket.map((el) => {
            return <Ticket ticketInfo={el}/>
          })}
        </div>
      </div>
    </div>
  );
}
