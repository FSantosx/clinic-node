require('dotenv').config()
// const mongoose      = require('mongoose')
// const cors          = require('cors')
// const helmet        = require('helmet');
const express       = require('express')
const cookieParser  = require('cookie-parser')
const app           = express()
const port          = 3000

app.use(express.json( { limit: '100mb' } ));
app.use(express.urlencoded( { extended: true, limit: '10mb' } ));
app.use(express.json())
app.use(cookieParser());
// app.use(cors());
// app.use(helmet());

app.use('*', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})

app.use('/api/db', require('./routes/route'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
// mongoose.connect(process.env.DB_STRING).then( () => {
//     // app.use('/api/person',                  require('./routes/personRoute'));
//     // app.use('/api/doctors',                 require('./routes/doctorsRoute'));
//     // app.use('/api/recepcionist',            require('./routes/recepcionistRoute'));
//     // app.use('/api/laboratoryTechnician',    require('./routes/laboratoryTechnicianRoute'));
// }).catch(err => console.log(err))


