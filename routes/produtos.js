var express = require('express');
var router = express.Router();
const produtosController = require('../controllers/produtosController')

router.get('/', produtosController.index)
router.get('/ver/:id', produtosController.findByCod('consultarProdutos'))
router.get('/search', produtosController.search)
router.post('/cadastro', produtosController.store)
router.get('/cadastro', produtosController.cadastro)
router.get('/editar/:id', produtosController.edit)
router.post('/editar/:id', produtosController.update)
router.get('/excluir/:id', produtosController.findByCod('excluirProduto'))
router.post('/excluir/:id', produtosController.destroy)


 
  module.exports = router;