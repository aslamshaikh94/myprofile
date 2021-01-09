import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import { StoreProvider } from '@store'

const MainApp = () => {
  return (
    <React.StrictMode>
      <StoreProvider>
        <App />
      </StoreProvider>
    </React.StrictMode>
  )
}

ReactDom.render(<MainApp />, document.getElementById('root'))
