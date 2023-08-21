import axios from 'axios';

export default axios.create({
    // baseURL: 'http://192.168.1.2:3000/',
    // baseURL: 'http://localhost:3000/',
    baseURL: 'https://puce-strange-sockeye.cyclic.cloud/',
})