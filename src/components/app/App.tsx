import { Route, Routes } from 'react-router-dom'
import Test from '../test/test'
import Header from '../header/header'
import Main from '../main/main'

function App() {
  return (
    <>
     <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='*' element={<div>404 - Страница не найдена</div>} />
      </Routes>
    </>
  )
}

export default App
