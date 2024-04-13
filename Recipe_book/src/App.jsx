import { useEffect, useState } from 'react'
import React from 'react'
import './App.css'
import Home from './Pages/Home'
import {Route,Routes ,BrowserRouter, Navigate} from 'react-router-dom'
import Authantication from './Places/Components/Authantication'
import Navigation from './Places/Components/Navigation'
import SingleRecipe from './Pages/SingleRecipe'
import Create from './Pages/Create'
import { AuthProvider } from './Places/Components/AuthContext'
import ProtectedRoute from './Places/Components/protectedRoute'
import Edit from './Pages/Edit'

function App() {
 
 

  return(
    <AuthProvider>
      <BrowserRouter>
        <Navigation/>
        <Routes>

            <Route path='/' element={<Navigate to="/recipe/home" />}></Route>
            <Route path='/recipe/home' element={<Home/>}></Route>
            <Route path='/recipe/auth' element={<Authantication/>}></Route>
            <Route path='/recipe/:id' element={<SingleRecipe/>}></Route>
            <Route path='/recipe/edit/:id' element={<Edit/>}></Route>
            <Route path='/recipe/create' element={
              <ProtectedRoute><Create/></ProtectedRoute>
            }></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )

 
}

export default App
