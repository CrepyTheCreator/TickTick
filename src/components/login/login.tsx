import { useRef, type FormEvent } from 'react';
import Button from '../button/button';
import styles from './login.module.css';
import { Preloader } from '../preloader/preloader';
import logo from '../../assets/Logo.svg'
import Line from '../line/line';
import { Link } from 'react-router-dom';

export default function Login () {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const loading = false;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(passwordRef.current?.value, usernameRef.current?.value)
  }
  
  return (
    <>
    <form className={styles.main} onSubmit={onSubmit}>
      <img src={logo} alt="Logo" className={styles.logo}/>
      <span>Username:</span>
      <input type="text" className={styles.input} required minLength={4} ref={usernameRef}/>
      <Line type='horizontal' />
      <span>Password:</span>
      <input type='password' className={styles.input} ref={passwordRef} required minLength={8}/>
      <Link to={'/register'} className={styles.link}>Don't have account?</Link>
      <Button type='fill' submit className={styles.btn}>Log in</Button>
      {loading ? <div className={styles.preloader}><Preloader /></div> : null}
    </form>
    </>
  );
}
