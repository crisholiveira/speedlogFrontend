const axios = require('axios')
const defaults = require('./default')

const url = 'produtos' // backend da rota app.js

const produtosRequest = {
    getProdutos: (key) => axios({
        ...defaults,
        method: 'get',
        url: `${url}/`,
        params: {filtro:key}
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
    putProdutos: (id, codigo, nome) => axios({
        ...defaults,
        method: 'put',
        url: `${url}/${id}`,
        data: {codigo, nome}
    }),
    
    deleteProdutos: (id) => axios({
        ...defaults,
        method: 'delete',
        url: `${url}/${id}`,
         
    })
};

module.exports = produtosRequest;