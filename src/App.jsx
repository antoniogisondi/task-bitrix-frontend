import React from 'react'
import Task from './pages/Task/Task';
import Home from './pages/Home/Home';
import CreateTask from './pages/CreateTask/CreateTask';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/task' element={<Task/>}/>
                <Route path='/create-task' element={<CreateTask/>}/>
            </Routes>
        </Router>
    </>
  )
}

export default App
