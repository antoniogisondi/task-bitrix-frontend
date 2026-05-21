import React from 'react'
import Task from './pages/Task/Task';
import Home from './pages/Home/Home';
import CreateTask from './pages/CreateTask/CreateTask';
import TaskDetail from './pages/TaskDetail/TaskDetail';
import EditTask from './pages/EditTask/EditTask';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/task' element={<Task/>}/>
                <Route path='/create-task' element={<CreateTask/>}/>
                <Route path='/task/:id' element={<TaskDetail/>}/>
                <Route path='/task/:id/edit' element={<EditTask/>}/>
            </Routes>
        </Router>
    </>
  )
}

export default App
