import API from './api'

export const getCompanies = async () => {
  const { data } = await API.post('/get_companies.php', {})

  if (!data.success) {
    throw new Error(data.message || 'Errore durante il recupero delle aziende')
  }

  return data.companies || []
}