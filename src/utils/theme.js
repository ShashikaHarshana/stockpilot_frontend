import { createTheme } from '@material-ui/core'

const theme = createTheme({
  palette: {
    primary: {
      main: '#00AEFF'
    },
    secondary: {
      main: '#E43066'
    }
  },
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The default props to change
      disableRipple: true // No more ripple, on the whole application 💣!
    }
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'capitalize',
        fontSize: '0.85rem'
      }
    },
    MuiIconButton: {
      root: {
        '&:hover': {
          backgroundColor: '#fff'
        }
      }
    }
  }
})

export default theme
