const mongoose = require('mongoose')
const exam    = require('./Exams')

const MedicalRecord = mongoose.model("MedicalRecord", {
    date                : String,
    medicalAppointment  : String,
    prescribedExams     : String,
    exams               : [exam]
})

module.exports = MedicalRecord