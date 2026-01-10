import { Route, Routes } from 'react-router-dom'
import Header from '../header/header'
import Main from '../main/main'
import Ticket from '../ticket/ticket'
import NewTicket from '../newTicket/newTicket'
import ProtectedRoute from '../../protect/protectedRoute'
import Register from '../register/register'
import Login from '../login/login'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Header/>}>
          <Route path='/' element={<Main />} />
          <Route path='/tickets/:id' element={<Ticket />}/>
          <Route path='*' element={<div>404 - Страница не найдена</div>} />
          <Route element={<ProtectedRoute />}>
            <Route path='/tickets' element={<NewTicket />} />
          </Route> 
        </Route>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </>
  )
}

export default App
