import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './app'
import './styles.css'
import { ThemeProvider } from './providers/theme-provider'
import { INITIAL_STATE, ImagesProvider } from './lib/context/ImagesProvider'
import { ToastProvider, ToastViewport } from './ui/toast'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ImagesProvider initialState={INITIAL_STATE}>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <ToastProvider duration={5000} swipeDirection='right'>
          <App />
          <ToastViewport />
        </ToastProvider>
      </ThemeProvider>
    </ImagesProvider>
  </React.StrictMode>,
)
