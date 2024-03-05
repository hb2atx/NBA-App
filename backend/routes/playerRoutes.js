const express = require('express')
const router = express.Router()
const playersController = require('../controllers/playersController')

router.route('/')
        .get(playersController.getAllPlayers)
   
router.route('/:name')
        .get(playersController.getSpecificPlayer)

router.route('/:position')
        .get(playersController.getPlayerByPosition)


module.exports = router