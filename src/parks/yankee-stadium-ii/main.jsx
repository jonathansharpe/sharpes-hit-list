import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'
import '../../globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App parkName="Yankee Stadium II" />
  </React.StrictMode>,
) 