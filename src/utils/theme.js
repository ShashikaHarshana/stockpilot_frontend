import { createTheme } from '@material-ui/core'

const theme = createTheme({
  palette: {
    primary: {
      main: '#00AEFF',
      light: '#F1F8F8',
      Dark: '#3B76A2'
    },
    secondary: {
      main: '#E43066',
      light: '#FFCDFF',
      darkLight: '#FB66AC'
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
