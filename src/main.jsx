import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

const params = new URLSearchParams(window.location.search)
const redirectPath = params.get('p')

if (redirectPath) {
  const cleanPath = redirectPath.startsWith('/') ? redirectPath : `/${redirectPath}`
  window.history.replaceState({}, '', `${import.meta.env.BASE_URL}${cleanPath.replace(/^\//, '')}`)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
