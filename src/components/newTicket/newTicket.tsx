import Button from '../button/button';
import TextArea from '../textArea/textArea';
import styles from './newTicket.module.css'

export default function NewTicket () {
  return (
    <div className={styles.main}>
      <div className={styles.ticketInputs}>
        <span>Title:</span>
        <input type="text" className={styles.titleInput} placeholder='Title'/>
        <span>Description:</span>
        <TextArea size='big' placeholder='Type your text here'/>
        <Button type='fill' className={styles.btn}>Create ticket</Button>
      </div>
    </div>
  );
}
