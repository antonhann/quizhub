import { Route, Routes } from 'react-router'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Home } from './Pages/Home'
import { Login, Register } from './Pages/Auth'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/register" element = {<Login/>}/>
          <Route path = "/login" element = {<Register/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

/*
TASKS:
-handle not found page
*/
//npm run dev to run app
export default App