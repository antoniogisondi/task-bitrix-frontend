import React from 'react'

function StatusBadge({ status }) {
  const map = {
    2: { label: 'Da iniziare', color: 'bg-gray-100 text-gray-600' },
    3: { label: 'In corso',    color: 'bg-blue-100 text-blue-600' },
    4: { label: 'In attesa di controllo',   color: 'bg-yellow-100 text-yellow-600' },
    5: { label: 'Completato',  color: 'bg-green-100 text-green-600' },
    6: { label: 'Rinviato',   color: 'bg-red-100 text-red-600' },
  }

  const { label, color } = map[status] ?? { label: `Stato ${status}`, color: 'bg-gray-100 text-gray-500' }

  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${color}`}>
      {label}
    </span>
  )
}


export default StatusBadge
