import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
        <h1>Benvenuto nella pagina dei task</h1>
        <Link to='/task'>Vai ai task</Link>
        <Link to='/create-task'>Crea un task</Link>
    </div>
  )
}

export default Home
