const produtosRequest = require('../requests/produtosRequests')



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
        let { id } = req.params;
        produtosRequest.getProdutosId(id)
        .then(({data:produto}) => {                                   
            return res.render('editarProdutos', { produto })
        })
        .catch(err => {
            console.log(err.message + 'Erro ao consumir api de serviços')
            return res.redirect('/produtos')
          })          
        

    },
    update: async (req, res) => {
        const { id } = req.params;
        const { codigo, nome } = req.body;

        produtosRequest.putProdutos(id, codigo, nome)
       .then(() => {
        return res.redirect(`/produtos/ver/${id}`)

       })
       .catch(err => {
        console.log(err.message + 'Erro ao consumir api de serviços')
        return res.redirect('/produtos')
      })          
       
      
    },

   
    destroy: async (req, res) => {
        const { id } = req.params;
        produtosRequest.deleteProdutos(id)
        .then(() => {
            return res.redirect('/produtos')
        })
        .catch(err => {
            console.log(err)
            console.log(err.message + 'Erro ao consumir api de serviços')
            return res.redirect('/produtos')
          })                       

    },

    findByCod: (view)=>{     

   
      return (req, res) => {
        let { id } = req.params;
        produtosRequest.getProdutosId(id)
        .then(({data: produto}) => {                            
            return res.render(view, { produto })
        })
        .catch(err => {
            console.log(err.message + 'Erro ao consumir api de serviços')
            return res.redirect('/produtos')
          })          

        }
        
    },
    search: async (req, res) => {
        let { page = 1 } = req.query
        let { key } = req.query;
        produtosRequest.getProdutos (key)
        .then(resposta => {
            totalPagina = resposta.data.totalPagina
            produtos = resposta.data.produtos                       
            return res.render('produtos', { produtos, totalPagina })
        })
        .catch(err => {
            console.log(err.message + 'Erro ao consumir api de serviços')
            return res.render('produtos', { produtos, totalPagina })
          })          
        
    }
}
module.exports = produtosController


