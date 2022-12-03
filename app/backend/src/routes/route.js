const route = require('express').Router()
const Entity = require('../controllers/entities');

route.get("/:table/:action/", (req, res) => {
    const url = req.url.split('/')
    const table = url[1]
    const action = url[2]
    const data = Entity.init(table, action)
    res.json(data).status(200)
})

route.get("/:table/:action/:id", (req, res) => {
    const url = req.url.split('/')
    const table = url[1]
    const action = url[2]
    const id = url[3]
    const data = Entity.init(table, action, id)
    res.json(data).status(200) })

route.post("/:table/:action/", (req, res) => {
    const url = req.url.split('/')
    const table = url[1]
    const action = url[2]

    data = req.body    
    saved = Entity.init(table, action, null, data)
    res.send(''+saved).status(200)
})

module.exports = route; 