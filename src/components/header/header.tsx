import { NavLink, Outlet } from 'react-router-dom';
import styles from './header.module.css';
import clsx from 'clsx';
import logo from '../../assets/Logo.svg'
import { useSelector } from 'react-redux';
import { getUser, logout } from '../../slices/userSlice/userSlice';
import { useDispatch } from '../../service/store';

export default function Header () {
  const dispatch = useDispatch();
  const data = useSelector(getUser);
  const userName = data ? data.name : 'Need to login';
  const userTickets = 10;
  const userColor = data ? data.profileColor : '#fff'
  const userCircleStyles = {
    backgroundColor: `${userColor}`,
  }

  return (
    <>
    <div className={styles.header}>
      <img src={logo} alt="Logo" className={styles.logo}/>
      <nav className={styles.nav}>
        <NavLink to={'/'} className={({isActive}) => clsx(isActive ? styles.activeLink : null, styles.link)}>Tickets List</NavLink>
        <NavLink to={'/tickets'} className={({isActive}) => clsx(isActive ? styles.activeLink : null, styles.link)}>Create New Ticket</NavLink>
        <NavLink to={'/profile'} className={({isActive}) => clsx(isActive ? styles.activeLink : null, styles.link)}>Profile</NavLink>
      </nav>
      <div className={styles.userInfo}>
        <div className={styles.profileInfo}>
          <span className={styles.userName}>{userName}</span>
          <div className={styles.userTickets}>
            <span className={styles.tickets}>Ative Tickets:</span>
            <span className={styles.ticketsValue}>{userTickets}</span>
          </div>
        </div>
        <div className={styles.profileCircle} onClick={() => {dispatch(logout())}} style={userCircleStyles}/>
      </div>
    </div>
    <Outlet/>
    </>
  );
}
