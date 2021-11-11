import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App/App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './redux/Store'
import { ToastContainer } from 'react-toastify'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer autoClose={3000} hideProgressBar position={'top-right'} />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
