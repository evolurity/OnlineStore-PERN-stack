const Router = require('express')
const BrandController = require('../controllers/brandController')
const router = new Router()

router.post('/', BrandController.create)
router.get('/', BrandController.getAll)


module.exports = router