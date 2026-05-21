import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md p-10 max-w-md w-full text-center">

        {/* Logo / intestazione */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500 mb-4">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Gestione Incarichi
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Powered by Bitrix24
          </p>
        </div>

        {/* Bottoni azione */}
        <div className="flex flex-col gap-3">
          <Link
            to="/task"
            className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
          >
            📋 Vai agli incarichi
          </Link>
          <Link
            to="/create-task"
            className="block w-full border border-orange-500 text-orange-500 hover:bg-orange-50 font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
          >
            ➕ Crea un incarico
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Home
