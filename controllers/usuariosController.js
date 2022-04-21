const usuariosRequest = require('../requests/usuariosRequests')



const usuariosController = {
    index: (req, res) => {
       
        let totalPagina = 0
        let usuarios = [];

        
        usuariosRequest.getUsuarios ()
        .then(resposta => {
            totalPagina = resposta.data.totalPagina
            usuarios = resposta.data.usuarios                       
            return res.render('usuarios', { usuarios, totalPagina })
        })
        .catch(err => {
            console.log(err.message + 'Erro ao consumir api de serviços')

            return res.render('usuarios', { usuarios, totalPagina })
          })       
          
},

    
    store:  (req, res) => {
       
       usuariosRequest.postUsuarios(req.body)
       .then(() => {
        return res.redirect('/usuarios')
       })      
       .catch(err => {
        console.log(err.message + 'Erro ao consumir api de serviços')
        return res.render('usuarios', { usuarios, totalPagina })
      })        
        
    },

    cadastro: (req,res)=> {

        res.render('cadastrousuario')
    },
    edit:  (req, res) => {
        let { id } = req.params;
        usuariosRequest.getUsuariosId(id)
        .then(({data:usuario}) => {                                   
            return res.render('editarusuarios', { usuario })
        })
        .catch(err => {
            console.log(err.message + 'Erro ao consumir api de serviços')
            return res.redirect('/usuarios')
          })          
        

    },
    update: async (req, res) => {
        const { id } = req.params;
        const {nome, sobrenome, setor, ativo, perfil, email } = req.body;

        usuariosRequest.putUsuarios(id, nome, sobrenome, setor, ativo, perfil, email)
       .then(() => {
        return res.redirect(`/usuarios/ver/${id}`)

       })
       .catch(err => {
        console.log(err.message + 'Erro ao consumir api de serviços')
        return res.redirect('/usuarios')
      })          
       
      
    },

   
    destroy: async (req, res) => {
        const { id } = req.params;
        usuariosRequest.deleteUsuarios(id)
        .then(() => {
            return res.redirect('/usuarios')
        })
        .catch(err => {
            console.log(err)
            console.log(err.message + 'Erro ao consumir api de serviços')
            return res.redirect('/usuarios')
          })                       

    },

    findByCod: (view)=>{     

   
      return (req, res) => {
        let { id } = req.params;
        usuariosRequest.getUsuariosId(id)
        .then(({data: usuario}) => {  
            console.log(usuario)                         
            return res.render(view, { usuario })
        })
        .catch(err => {
            console.log(err.message + 'Erro ao consumir api de serviços')
            return res.redirect('/usuarios')
          })          

        }
        
    },
    search: async (req, res) => {
        let { page = 1 } = req.query
        let { key } = req.query;
        usuariosRequest.getUsuarios (key)
        .then(resposta => {
            totalPagina = resposta.data.totalPagina
            usuarios = resposta.data.usuarios                       
            return res.render('usuarios', { usuarios, totalPagina })
        })
        .catch(err => {
            console.log(err.message + 'Erro ao consumir api de serviços')
            return res.render('usuarios', { usuarios, totalPagina })
          })          
        
    }
}
module.exports = usuariosController

