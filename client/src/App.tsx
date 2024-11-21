import { Route, Routes } from 'react-router'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Layout } from './components/reusables/components/Layout'
import React from 'react'

import { Home } from './components/Pages/Home'
import { Register } from './components/Pages/auth/Register'
import { SessionProvider } from './SessionContext'
import { Create } from './components/Pages/Create'
import { Library } from './components/Pages/Library'
import { NotFound } from './components/Pages/NotFound'
import ViewSet from './components/Pages/ViewSet'
import Flashcard from './components/Pages/Flashcard'
import Search from './components/Pages/Search'
import { Login } from './components/Pages/auth/Login'
import TestDisplay from './components/Pages/Test'

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
  },
  {
    path: "/test-set/:id",
    component: TestDisplay
  }
];

function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          {ROUTES.map((route, index) => (
            <Route key={index} path={route.path} element={
            <Layout>
              <route.component />
            </Layout>
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