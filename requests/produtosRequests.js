const axios = require('axios')
const defaults = require('./default')

const url = 'produtos' // backend da rota app.js

const produtosRequest = {
    getProdutos: ( ) => axios({
        ...defaults,
        method: 'get',
        url: `${url}/`
    }),
    getProdutosId: (id) => axios({
        ...defaults,
        method: 'get',
        url: `${url}/${id}`

    }),

    postProdutos: (produto) => axios({
        ...defaults,
        method: 'post',
        url: `${url}/`,
        data: produto    
    }),
    putProdutos: (produto) => axios({
        ...defaults,
        method: 'put',
        url: `${url}/`,
        data: produto    
    })
};

module.exports = produtosRequest;