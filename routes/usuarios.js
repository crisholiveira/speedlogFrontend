var express = require('express');
var router = express.Router();
const usuariosController = require('../controllers/usuariosController')

router.get('/', usuariosController.index)
router.get('/ver/:id', usuariosController.findByCod('consultarUsuarios'))
router.get('/search', usuariosController.search)
router.post('/cadastro', usuariosController.store)
router.get('/cadastro', usuariosController.cadastro)
router.get('/editar/:id', usuariosController.edit)
router.post('/editar/:id', usuariosController.update)
router.get('/excluir/:id', usuariosController.findByCod('excluirUsuario'))
router.post('/excluir/:id', usuariosController.destroy)


 
  module.exports = router;

