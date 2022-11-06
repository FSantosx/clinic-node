const route = require('express').Router()
const Recepcionist = require('../models/Recepcionist')
const md5 = require('md5')


// create a new Recepcionist without a credentials
route.post('/', async (req, res) => {
    try {
        const { name, cpf, email, cellphone } = req.body
        const rep = { name, cpf, email, cellphone};

        for (let [key, value] of Object.entries(rep)){
            if(value == undefined){
                return res.status(422).json({ err:'todos os campos são obrigatórios' })
            }
        }

        await Recepcionist.create(rep);
        res.status(201).json( { message: 'registro inserido com sucesso' } )
        
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// return all objects of collection
route.get('/', async(req, res) => {
    try {
        const rep = await Recepcionist.find();
        res.status(200).json(rep)
        
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// return one document of a Recepcionist id
route.get('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const rep = await Recepcionist.findById({ _id: id}).exec()

        if(!rep){
            res.status(404).json({ message:"Recepcionista não encontrado"})
            return
        }

        res.status(200).json(rep)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// update a Recepcionist info
route.patch('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const { name, cpf, email, cellphone } = req.body
        const rep = {
            name, cpf, email, cellphone 
        }
        const repUpdated = await Recepcionist.updateOne({ _id: id}, rep)

        if(repUpdated.matchedCount === 0){
            res.status(404).json({ message:"Recepcionista não encontrado"})
            return
        }

        res.status(200).json(repUpdated)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// insert a new user to Recepcionist
route.post('/:id/credentials', async(req, res) => {
    try {
        const id = req.params.id;
        const { user, active } = req.body
        const password = md5(req.body.password)
        
        const credential = { 
            user, 
            password,
            active 
        }
       
        const repUpdated = await Recepcionist.updateOne({ _id: id}, {
            $push: { credentials: credential }
        })

        if(repUpdated.matchedCount === 0){
            res.status(404).json({ message:"Recepcionista não encontrado"})
            return
        }

        res.status(200).json(repUpdated)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// update a Recepcionist credential
route.patch('/:id/credentials/:idCred', async(req, res) => {
    try {
        const { id, idCred } = req.params;

        const { user, active } = req.body
        const password = md5(req.body.password)
       
        const repUpdated = await Recepcionist.updateOne(
            { _id: id, "credentials._id" : idCred }, 
            { $set: 
                { 
                    "credentials.$.user": user,
                    "credentials.$.password": password, 
                    "credentials.$.active": active,
                }
            })

        if(repUpdated.matchedCount === 0){
            res.status(404).json({ message:"Recepcionista não encontrado"})
            return
        }

        res.status(200).json(repUpdated)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// delete a one Recepcionist
route.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        
        const rep = await Recepcionist.find({ _id: id})

        if(!rep){
            res.status(404).json({ message: "Recepcionista não encontrado"})
            return
        }
        
        await repUpdated.deleteOne({_id: id})
        res.status(200).json({message: 'Recepcionista removido com sucesso'})

    } catch (err) {
        res.status(500).json({ error: err })
    }
})


module.exports = route