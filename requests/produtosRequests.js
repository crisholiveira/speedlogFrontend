const axios = require('axios')
const defaults = require('./default')

const url = 'produtos' // backend da rota app.js

const produtosRequest = {
    getProdutos: ( ) => axios({
        ...defaults,
        method: 'get',
        url: `${url}/`
    })
};

module.exports = produtosRequest;