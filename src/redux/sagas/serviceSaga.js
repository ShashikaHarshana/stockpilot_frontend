import axios from "axios";
import {REGISTER_URL} from "../../CONSTANTS";


export function register (user) {
    return axios.post(REGISTER_URL, {
        user
    });
}


export function login (creds) {
  // axios.post(url, creds)
}
//
///user/login
//user/register
