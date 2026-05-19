import React from 'react'
import Task from './pages/Tasks/Task';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
        <Router>
            <Routes>
                <Route path='/task' element={<Task/>}/>
            </Routes>
        </Router>
    </>
  )
}

export default App
