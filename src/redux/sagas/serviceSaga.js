import axios from "axios";
import {LOGIN_URL, REGISTER_URL} from "../../CONSTANTS";


export function register (user) {
    return axios.post(REGISTER_URL, {
        user
    });
}


export function login (creds) {
    return axios.post(LOGIN_URL, {
        creds
    });
}
//
///user/login
//user/register
