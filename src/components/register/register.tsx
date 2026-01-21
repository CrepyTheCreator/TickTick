import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import Button from '../button/button';
import styles from './register.module.css';
import { Preloader } from '../preloader/preloader';
import logo from '../../assets/Logo.svg'
import Line from '../line/line';
import { Link, useNavigate } from 'react-router-dom';
import { getAuthenticate, getUserRequest, registerUser } from '../../slices/userSlice/userSlice';
import { useDispatch, useSelector } from '../../service/store';

export default function Register () {
  const dispatch = useDispatch();
  const colorRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');
  const loading = useSelector(getUserRequest);
  const isAuthenticated = useSelector(getAuthenticate);
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if(passwordRef.current && colorRef.current) {
      dispatch(registerUser({username: name, password: passwordRef.current?.value, profileColor: colorRef.current?.value}))
      if(isAuthenticated) navigate('/', { replace: true })
    }
  }
  
  const onChange = (e:ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  return (
    <>
    <form className={styles.main} onSubmit={onSubmit}>
      <img src={logo} alt="Logo" className={styles.logo}/>
      <span>Username:</span>
      <input type="text" onChange={onChange} className={styles.input} required minLength={4}/>
      <Line type='horizontal' />
      <span>Password:</span>
      <input type='password' className={styles.input} ref={passwordRef} required minLength={8}/>
      <Line type='horizontal' />
      <span>Profile color:</span>
      <div className={styles.profile}>
        <div className={styles.colorDiv}>
          <input type='color' ref={colorRef} className={styles.colorInput}/>
        </div>
        <div className={styles.profileText}>
          <span className={styles.usernameExample}>{name.length > 0 ? name : 'YourUsername'}</span>
          <span>Active Tickets: 12</span>
        </div>
      </div>
      <Link to={'/login'} className={styles.link}>Have account?</Link>
      <Button type='fill' submit className={styles.btn}>Register</Button>
      {loading ? <div className={styles.preloader}><Preloader /></div> : null}
    </form>
    </>
  );
}
