const Router = require('express')
const DeviceRouter = require('../controllers/deviceController')
const router = new Router()

router.post('/', DeviceRouter.create)
router.get('/', DeviceRouter.getAll)
router.get('/:id', DeviceRouter.getOne)


module.exports = router