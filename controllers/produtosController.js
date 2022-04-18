const { Produto, sequelize } = require('../models')
const Sequelize = require('sequelize')
const produtosRequest = require('../requests/produtosRequests')
const Op = Sequelize.Op


const produtosController = {
    index: (req, res) => {
       
        let totalPagina = 0
        let produtos = [];

        
        produtosRequest.getProdutos ()
        .then(resposta => {
            totalPagina = resposta.data.totalPagina
            produtos = resposta.data.produtos                       
            return res.render('produtos', { produtos, totalPagina })
        })
        .catch(err => {
            console.log(err.message + 'Erro ao consumir api de serviços')
            return res.render('produtos', { produtos, totalPagina })
          })        
},


    /*create: (req, res) => {

        return res.render('cadastroProduto')
    },*/
    
    store:  (req, res) => {
       
       produtosRequest.postProdutos(req.body)
       .then(() => {
        return res.redirect('/produtos')
       })      
       .catch(err => {
        console.log(err.message + 'Erro ao consumir api de serviços')
        return res.render('produtos', { produtos, totalPagina })
      })        
        
    },
    cadastro: (req,res)=> {

        res.render('cadastroProduto')
    },
    edit:  (req, res) => {
        produtosRequest.getProdutosId(req.params.id)
        
        .then((resultado) => {
            console.log(resultado.data)
            const produto = resultado.data.produtos[0]
            return res.render('editarProdutos', { produto })
           })      
           .catch(err => {
            console.log(err.message + 'Erro ao consumir api de serviços')
            
          })                  
        

    },
    update: async (req, res) => {
        const { id } = req.params;
        const { codigo, nome } = req.body;
        const produto = await Produto.update({
            codigo,
            nome
        },
            {
                where: {
                    id
                }

            })
        console.log(produto)
        return res.redirect(`/produtos/ver/${id}`)

        /*return res.redirect('/produtos')*/

    },

    consult: async (req, res) => {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);
        return res.render('excluirProduto', { produto })
    },

    destroy: async (req, res) => {
        const { id } = req.params;
        const produto = await Produto.destroy({
            where: { id }

        })
        return res.redirect('/produtos')

    },

    findByCod: async (req, res) => {
        let { id } = req.params;
        let produto = await Produto.findOne({
            where: {
                id: id
            }
        })
        return res.render('consultarProdutos', { produto })
    },
    search: async (req, res) => {
        let { page = 1 } = req.query
        let { key } = req.query;
        let { count: total, rows: produtos } = await Produto.findAndCountAll({
            where: {
                [Op.or]: {
                    nome: { [Op.like]: `%${key}%` },
                    codigo: { [Op.like]: `%${key}%` }
                }
            },
            order: [[`nome`, `ASC`]],
            limit: 10,
            offset: (page - 1) * 10
        })
        let totalPagina = Math.round(total / 10)
        return res.render('produtos', { produtos, totalPagina })

    }
}
module.exports = produtosController


