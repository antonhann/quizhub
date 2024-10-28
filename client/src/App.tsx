import { Route, Routes } from 'react-router'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Home } from './Pages/Home'
import { Login, Register } from './Pages/Auth'
import { SessionProvider } from './SessionContext'
function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/register" element = {<Register/>}/>
          <Route path = "/login" element = {<Register/>}/>
          
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  )
}

/*
TASKS:
-handle not found page
*/
//npm run dev to run app
export default App