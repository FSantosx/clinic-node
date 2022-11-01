const route = require('express').Router()
const Doctor = require('../models/Doctor')
const md5 = require('md5')


// create a new doctor without a credentials
route.post('/', async (req, res) => {
    try {
        const { name, crm, email, especiality, cellphone } = req.body
        const doctor = { name, crm, email, especiality, cellphone};

        for (let [key, value] of Object.entries(doctor)){
            if(value == undefined){
                return res.status(422).json({ err:'todos os campos são obrigatórios' })
            }
        }

        await Doctor.create(doctor);
        res.status(201).json({message: 'registro inserido com sucesso'})
        
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// return all objects of collection
route.get('/', async(req, res) => {
    try {
        const doctor = await Doctor.find();
        res.status(200).json(doctor)
        
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// return one document of a doctor id
route.get('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const doctor = await Doctor.findById({ _id: id}).exec()

        if(!doctor){
            res.status(404).json({ message:"Médico não encontrado"})
            return
        }

        res.status(200).json(doctor)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// update a doctor info
route.patch('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const { name, crm, email, especiality, cellphone } = req.body
        const doctor = {
            name, crm, email, especiality, cellphone 
        }
        const doctorUpdated = await Doctor.updateOne({ _id: id}, doctor)

        if(doctorUpdated.matchedCount === 0){
            res.status(404).json({ message:"Médico não encontrado"})
            return
        }

        res.status(200).json(patient)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// insert a new user to doctor
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
       
        const updatedDoctor = await Doctor.updateOne({ _id: id}, {
            $push: { credentials: credential }
        })

        if(updatedDoctor.matchedCount === 0){
            res.status(404).json({ message:"Médico não encontrado"})
            return
        }

        res.status(200).json(updatedDoctor)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// update a doctor credential
route.patch('/:id/credentials/:idCred', async(req, res) => {
    try {
        const { id, idCred } = req.params;

        const { user, active } = req.body
        const password = md5(req.body.password)
       
        const updatedDoctor = await Patient.updateOne(
            { _id: id, "credentials._id" : idCred }, 
            { $set: 
                { 
                    "credentials.$.user": user,
                    "credentials.$.password": password, 
                    "credentials.$.active": active,
                }
            })

        if(updatedDoctor.matchedCount === 0){
            res.status(404).json({ message:"Médico não encontrado"})
            return
        }

        res.status(200).json(updatedDoctor)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// delete a one doctor
route.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        
        const doctor = await Doctor.find({ _id: id})

        if(!doctor){
            res.status(404).json({ message: "Médico não encontrado"})
            return
        }
        
        await doctor.deleteOne({_id: id})
        res.status(200).json({message: 'Médico removido com sucesso'})

    } catch (err) {
        res.status(500).json({ error: err })
    }
})


module.exports = route