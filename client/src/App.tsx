import { Route, Routes } from 'react-router'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Home } from './components/Pages/Home'
import { Login, Register } from './components/Pages/Auth'
import { SessionProvider } from './SessionContext'
import { Create } from './components/Pages/Create'
import { ViewMyStudySet } from './components/Pages/ViewMyStudySet'
import { NotFound } from './components/Pages/NotFound'
function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/register" element = {<Register/>}/>
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/create" element = {<Create/>}/>
          <Route path = "/view-my-study-set" element = {<ViewMyStudySet/>}/>
          <Route path="*" element={<NotFound />} />  
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