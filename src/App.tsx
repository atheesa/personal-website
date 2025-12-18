import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route} from 'react-router';
import HomePage from './pages/home/HomePage';

function App() {
  return (
    <Routes>
      <Route index element={<HomePage></HomePage>} />
    </Routes>
  )
}

export default App
