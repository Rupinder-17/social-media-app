import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Register } from '../Register'
import { Login } from '../../Login'

export const Index = () => {
    
  return (
    <div>
        <Routes>
            <Route path='/' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>

        </Routes>

    </div>
  )
}
