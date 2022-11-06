const route = require('express').Router()
const LaboratoryTechnician = require('../models/LaboratoryTechnician')
const md5 = require('md5')


// create a new tec without a credentials
route.post('/', async (req, res) => {
    try {
        const { name, crf, email, especiality, cellphone } = req.body
        const tec = { name, crf, email, especiality, cellphone};

        for (let [key, value] of Object.entries(tec)){
            if(value == undefined){
                return res.status(422).json({ err:'todos os campos são obrigatórios' })
            }
        }

        await LaboratoryTechnician.create(tec);
        res.status(201).json({message: 'registro inserido com sucesso'})
        
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// return all objects of collection
route.get('/', async(req, res) => {
    try {
        const tec = await LaboratoryTechnician.find();
        res.status(200).json(tec)
        
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// return one document of a tec id
route.get('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const tec = await LaboratoryTechnician.findById({ _id: id}).exec()

        if(!tec){
            res.status(404).json({ message:"Técnico não encontrado"})
            return
        }

        res.status(200).json(tec)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// update a tec info
route.patch('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const { name, crf, email, especiality, cellphone } = req.body
        const tec = {
            name, crf, email, especiality, cellphone 
        }
        const tecUpdated = await LaboratoryTechnician.updateOne({ _id: id}, tec)

        if(tecUpdated.matchedCount === 0){
            res.status(404).json({ message:"Técnico não encontrado"})
            return
        }

        res.status(200).json(tec)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// insert a new user to tec
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
       
        const tecUpdated = await LaboratoryTechnician.updateOne({ _id: id}, {
            $push: { credentials: credential }
        })

        if(tecUpdated.matchedCount === 0){
            res.status(404).json({ message:"Técnico não encontrado"})
            return
        }

        res.status(200).json(tecUpdated)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// update a tec credential
route.patch('/:id/credentials/:idCred', async(req, res) => {
    try {
        const { id, idCred } = req.params;

        const { user, active } = req.body
        const password = md5(req.body.password)
       
        const tecUpdated = await LaboratoryTechnician.updateOne(
            { _id: id, "credentials._id" : idCred }, 
            { $set: 
                { 
                    "credentials.$.user": user,
                    "credentials.$.password": password, 
                    "credentials.$.active": active,
                }
            })

        if(tecUpdated.matchedCount === 0){
            res.status(404).json({ message:"Técnico não encontrado"})
            return
        }

        res.status(200).json(tecUpdated)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// delete a one tec
route.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        
        const tec = await LaboratoryTechnician.find({ _id: id})

        if(!tec){
            res.status(404).json({ message: "Técnico não encontrado"})
            return
        }
        
        await LaboratoryTechnician.deleteOne({_id: id})
        res.status(200).json({message: 'Técnico removido com sucesso'})

    } catch (err) {
        res.status(500).json({ error: err })
    }
})


module.exports = route