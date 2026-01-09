import { Route, Routes } from 'react-router-dom'
import Header from '../header/header'
import Main from '../main/main'
import Ticket from '../ticket/ticket'
import NewTicket from '../newTicket/newTicket'

function App() {
  return (
    <>
     <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/tickets' element={<NewTicket />} />
        <Route path='/tickets/:id' element={<Ticket />}/>
        <Route path='*' element={<div>404 - Страница не найдена</div>} />
      </Routes>
    </>
  )
}

export default App
