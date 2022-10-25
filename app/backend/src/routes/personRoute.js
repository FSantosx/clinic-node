const route = require('express').Router()
const Patient = require('../models/Patient')

route.post('/', async (req, res) => {
    try {
        const { name, age, email, birthday, cellphone } = req.body
        const patient = { name, age, email, birthday, cellphone};

        for (let [key, value] of Object.entries(patient)){
            if(value == undefined){
                return res.status(422).json({ err:'todos os campos são obrigatórios' })
            }
        }
        await Patient.create(patient);
        res.status(201).json({message: 'registro inserido com sucesso'})
        
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

route.get('/', async(req, res) => {
    try {
        // return all objects of collection
        const patients = await Patient.find();
        res.status(200).json(patients)
        
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

route.get('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const patient = await Patient.findById({ _id: id}).exec()

        if(!patient){
            res.status(404).json({ message:"Usuário não encontrado"})
            return
        }

        res.status(200).json(patient)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

route.patch('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const { name, age, email, birthday, cellphone } = req.body
        const patient = {
            name, age, email, birthday, cellphone 
        }
        const updatedPatient = await Patient.updateOne({ _id: id}, patient)

        if(updatedPatient.matchedCount === 0){
            res.status(404).json({ message:"Paciente não encontrado"})
            return
        }

        res.status(200).json(patient)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// inserir medical records
route.post('/:id/medicalrecords', async(req, res) => {
    try {
        const id = req.params.id;
        const { date, medicalAppointment, prescribedExams } = req.body
        const medicalR = { date, medicalAppointment, prescribedExams }
       
        const updatedPatient = await Patient.updateOne({ _id: id}, {$push: { medicalRecord: medicalR }})

        if(updatedPatient.matchedCount === 0){
            res.status(404).json({ message:"Paciente não encontrado"})
            return
        }

        res.status(200).json(medicalR)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// atualizar medical records
route.patch('/:id/medicalrecords/:idMed', async(req, res) => {
    try {
        const { id, idMed } = req.params;

        const { date, medicalAppointment, prescribedExams } = req.body
       
        const updatedPatient = await Patient.updateOne(
            { _id: id, "medicalRecord._id" : idMed }, 
            { $set: 
                { 
                    "medicalRecord.$.date": date,
                    "medicalRecord.$.medicalAppointment": medicalAppointment, 
                    "medicalRecord.$.prescribedExams": prescribedExams,
                }
            })

        if(updatedPatient.matchedCount === 0){
            res.status(404).json({ message:"Paciente não encontrado"})
            return
        }

        res.status(200).json(updatedPatient)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// inserir exams
route.post('/:id/exams', async(req, res) => {
    try {
        const id = req.params.id;
        const { date, exam, Appointment} = req.body
        const exams = { date, exam, Appointment }
        const updatedPatient = await Patient.updateOne({ _id: id}, {$push: { exams: exams }})
        if(updatedPatient.matchedCount === 0){
            res.status(404).json({ message:"Paciente não encontrado"})
            return
        }

        res.status(200).json(updatedPatient)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// atualizar exams
route.patch('/:id/exams/:idExams', async(req, res) => {
    try {
        const { id, idExams } = req.params;
        const { date, exam, Appointment} = req.body
        const updatedPatient = await Patient.updateOne(
            { _id: id, "exams._id" : idExams }, 
            { $set: 
                { 
                    "exams.$.date"       : date,
                    "exams.$.exam"       : exam, 
                    "exams.$.Appointment": Appointment,
                }
            })

        if(updatedPatient.matchedCount === 0){
            res.status(404).json({ message:"Paciente não encontrado"})
            return
        }
        res.status(200).json(updatedPatient)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// inserir schedules
route.post('/:id/schedules', async(req, res) => {
    try {
        /**
         *  date                : String,
            specialty           : String
         */
        const id = req.params.id;
        const { date, specialty, doctor} = req.body
        const schedule =  { date, specialty, doctor }
       
        const updatedPatient = await Patient.updateOne({ _id: id}, {$push: { schedules: schedule }})

        if(updatedPatient.matchedCount === 0){
            res.status(404).json({ message:"Paciente não encontrado"})
            return
        }

        res.status(200).json(updatedPatient)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// atualizar schedules
route.patch('/:id/schedules/:idSched', async(req, res) => {
    try {
        const { id, idSched } = req.params;
        const { date, specialty, doctor} = req.body  
        const updatedPatient = await Patient.updateOne(
            { _id: id, "schedules._id" : idSched }, 
            { $set: 
                { 
                    "schedules.$.date": date,
                    "schedules.$.specialty": specialty, 
                    "schedules.$.doctor": doctor,
                }
            })
        if(updatedPatient.matchedCount === 0){
            res.status(404).json({ message:"Paciente não encontrado"})
            return
        }

        res.status(200).json(updatedPatient)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})


route.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        
        const patient = await Patient.find({ _id: id})

        if(!patient){
            res.status(404).json({ message:"Usuário não encontrado"})
            return
        }
        
        await Patient.deleteOne({_id: id})
        res.status(200).json({message: 'Usuário removido com sucesso'})

    } catch (err) {
        res.status(500).json({ error: err })
    }
})


module.exports = route