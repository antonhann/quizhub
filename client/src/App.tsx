import { Route, Routes } from 'react-router'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from './components/reusables/AppContainer'
import React from 'react'

import { Home } from './components/Pages/Home'
import { Login, Register } from './components/Pages/Auth'
import { SessionProvider } from './SessionContext'
import { Create } from './components/Pages/Create'
import { Library } from './components/Pages/Library'
import { NotFound } from './components/Pages/NotFound'
import ViewSet from './components/Pages/ViewSet'
import Flashcard from './components/Pages/Flashcard'
import Search from './components/Pages/Search'

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
    path: "/my-library",
    component: Library,
  },
  {
    path: "/view-set/:id",
    component: ViewSet,
  },
  { 
    path: "/flashcard-set/:id",
    component: Flashcard,
  },
  {
    path: "/search/:prefix",
    component: Search
  }
];

function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          {ROUTES.map((route, index) => (
            <Route key={index} path={route.path} element={
            <AppContainer>
              <route.component />
            </AppContainer>
          } />
          ))}
          <Route path = "*" element = {<NotFound/>}/>
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