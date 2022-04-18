const axios = require('axios')
const defaults = require('./default')

const url = 'login' // backend da rota app.js

const loginRequest = {
    login: (body) => axios({
        ...defaults,
        method: 'post',
        url: `${url}/`
    })
};

module.exports = produtosRequest;