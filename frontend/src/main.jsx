import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from "react-redux"
import { store } from './redux/store.js'

export const serverUrl="http://localhost:8000"
createRoot(document.getElementById('root')).render(
    // browser router help in routing
    // provider provide store 
<BrowserRouter>
<Provider store={store}>
    <App />
</Provider>
</BrowserRouter>
 
)
