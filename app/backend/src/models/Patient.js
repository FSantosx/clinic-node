const mongoose  = require('mongoose')

const Patient = mongoose.model("Patient", {
    name                    : String,
    age                     : Number,
    cpf                     : String,
    email                   : String,
    birthday                : String,
    cellphone               : String, 
    medicalRecord  : [{ 
        date                : String,
        medicalAppointment  : String,
        prescribedExams     : String, 
    }],
    schedules      : [{ 
        date                : String,
        specialty           : String,
        doctor              : String,
    }],  
    exams          : [{  
        date                : String,
        exam                : String,
        Appointment         : String  
    }],
})

module.exports = Patient