const route = require('express').Router()
const User = require('../models/User')

route.post('/', async (req, res) => {
    try {   
        const { name, type, email, pass, birthday, active } = req.body
        const user = { name, type, email, pass, birthday, active };
        // console.log(user)

        for (let [key, value] of Object.entries(user)){
            if(value == undefined){
                return res.status(422).json({ err:'todos os campos são obrigatórios' })
            }
        }
        await User.create(user);
        res.status(201).json({message: 'registro inserido com sucesso'})
        
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

route.get('/', async(req, res) => {
    try {
        const Users = await User.find();
        res.status(200).json(Users)        
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

route.get('/:id', async(req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findById({ _id: id}).exec()
        if(!user){
            res.status(404).json({ message:"Usuário não encontrado"})
            return
        }
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

route.patch('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const { name, type, email, pass, birthday, active } = req.body
        const user = { name, type, email, pass, birthday, active }
        const updatedUser = await User.updateOne({ _id: id}, user)
        if(updatedUser.matchedCount === 0){
            res.status(404).json({ message:"Usuário não encontrado"})
            return
        }
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ error: err })
    }

})

route.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const user = await User.find({ _id: id})
        if(!user){
            res.status(404).json({ message:"Usuário não encontrado"})
            return
        }
        await User.deleteOne({_id: id})
        res.status(200).json({message: 'Usuário removido com sucesso'})
    } catch (err) {
        res.status(500).json({ error: err })
    }
})


module.exports = route