import axios from 'axios'

export function register(data) {
    console.log("REGISTER asdfasfd - ", data);
    return axios.post('api/Account/register', data);
}