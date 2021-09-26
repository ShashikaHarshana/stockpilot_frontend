import axios from 'axios'
export function login (creds) {
  axios.post(url, creds)
}

export function register (user) {
  console.log(user)
}

///user/login
//user/register
