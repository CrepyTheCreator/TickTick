import { useRef, useState, type FormEvent } from 'react';
import Button from '../button/button';
import TextArea from '../textArea/textArea';
import styles from './newTicket.module.css'
import { createTicket } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { Preloader } from '../preloader/preloader';

export default function NewTicket () {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const titleTextRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const submit = async (e: FormEvent) => {
    e.preventDefault();

    if (titleTextRef.current?.value && descriptionRef.current?.value) {
      try {
        setLoading(true);
        const data = await createTicket(
          titleTextRef.current.value, 
          descriptionRef.current.value
        );
        navigate(`/tickets/${data.id}`);
      } catch (error) {
        console.error('Error creating ticket:', error);
        setLoading(false);
      }
    }
  };

  if(loading) return <Preloader />

  return (
    <div className={styles.main}>
      <form className={styles.ticketInputs} onSubmit={submit}>
        <span>Title:</span>
        <input type="text" className={styles.titleInput} placeholder='Title' required ref={titleTextRef} minLength={3}/>
        <span>Description:</span>
        <TextArea size='big' placeholder='Type your text here' ref={descriptionRef} required/>
        <Button type='fill' className={styles.btn} submit>Create ticket</Button>
      </form>
    </div>
  );
}
