import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route} from 'react-router';
import HomePage from './pages/home/HomePage';
import GraphLangPage from './pages/projects/GraphLangPage';

function App() {
  return (
    <Routes>
      <Route index element={<HomePage></HomePage>} />
      <Route path="project/1" element={<GraphLangPage></GraphLangPage>} />

    </Routes>
  )
}

export default App
