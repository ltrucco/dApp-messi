import axios from 'axios'

export default axios.create({
    baseURL: 'http://185.28.22.17:8081/api/',
    timeout: 10000000,
    responseType: "json",
    withCredentials: false,
    headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',        

    }
})