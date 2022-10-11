const router = require('express').Router();
const database =  require('../models/database').getDbo()

router.post(`/post`, async (req, res) => {
    await database
    res.send('Post API')
})

router.get(`/getAll/:collection`, (req, res) => {
    res.send(req.params.collection)
})


router.get('/getOne/:collection/:id', (req, res) => {
    res.send('Get by ID API')
})


router.patch('/update/:collection/:id', (req, res) => {
    res.send('Update by ID API')
})

router.delete('/delete/:collection/:id', (req, res) => {
    res.send('Delete by ID API')
})

module.exports = router;