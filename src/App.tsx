import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route} from 'react-router';
import HomePage from './pages/home/HomePage';
import GraphLangPage from './pages/projects/GraphLangPage';
import RunwaySimPage from './pages/projects/RunwaySimPage';
import DissertationPage from './pages/projects/DissertationPage';
import TetrECSPage from './pages/projects/TetrECSPage';


function App() {
  return (
    <Routes>
      <Route index element={<HomePage></HomePage>} />
      <Route path="project/1" element={<GraphLangPage></GraphLangPage>} />
      <Route path="project/2" element={<RunwaySimPage></RunwaySimPage>}/>
      <Route path="project/6" element={<TetrECSPage></TetrECSPage>}/>
      <Route path="project/4" element={<DissertationPage/>}/>
    </Routes>
  )
}

export default App
