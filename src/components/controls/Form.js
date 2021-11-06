import React from 'react'

const Form = props => {
  const { children, ...other } = props
  return <form {...other}>{props.children}</form>
}

export default Form
