import { Route, Routes } from 'react-router'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Home } from './components/Pages/Home'
import { Login, Register } from './components/Pages/Auth'
import { SessionProvider } from './SessionContext'
import { Create } from './components/Pages/Create'
import { ViewMyStudySet } from './components/Pages/ViewMyStudySet'
import { NotFound } from './components/Pages/NotFound'
import React from 'react'

interface RouteConfig{
  path: string,
  component: React.FC
}

const ROUTES: RouteConfig[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/create",
    component: Create,
  },
  {
    path: "/view-my-study-set",
    component: ViewMyStudySet,
  },
  {
    path: "*",
    component: NotFound,
  },
];

function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          {ROUTES.map((route, index) => (
            <Route key={index} path={route.path} element={<route.component />} />
          ))}
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