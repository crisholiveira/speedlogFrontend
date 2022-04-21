const axios = require('axios')
const defaults = require('./default')

const url = 'usuarios' // backend da rota app.js

const usuariosRequest = {
    getUsuarios: (key) => axios({
        ...defaults,
        method: 'get',
        url: `${url}/`,
        params: {filtro:key}
    }),

    getUsuariosId: (id) => axios({
        ...defaults,
        method: 'get',
        url: `${url}/${id}`

    }),

    postUsuarios: (usuario) => axios({
        ...defaults,
        method: 'post',
        url: `${url}/`,
        data: usuario    
    }),
    putUsuarios: (id, nome, sobrenome, setor, ativo, perfil, email) => axios({
        ...defaults,
        method: 'put',
        url: `${url}/${id}`,
        data: {nome, sobrenome, setor, ativo, perfil, email}
    }),
    
    deleteUsuarios: (id) => axios({
        ...defaults,
        method: 'delete',
        url: `${url}/${id}`,
         
    })
};

module.exports = usuariosRequest;