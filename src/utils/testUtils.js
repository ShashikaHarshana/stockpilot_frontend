import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { authReducer } from '../redux/ducks/auth'
import { chartReducer } from '../redux/ducks/chart'
import { watchlistReducer } from '../redux/ducks/watchlist'

import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../utils/theme'

function render (
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        auth: authReducer,
        watchlist: watchlistReducer,
        chart: chartReducer,
      },
      preloadedState
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper ({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </BrowserRouter>
      </Provider>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }
