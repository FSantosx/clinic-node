require('dotenv').config()

const express       = require('express')
const mongoose      = require('mongoose')
const cookieParser  = require('cookie-parser')
const cors          = require('cors')
const helmet        = require('helmet');
const app           = express()
const port          = 3000

app.use(express.json( { limit: '100mb' } ));
app.use(express.urlencoded( { extended: true, limit: '10mb' } ));
app.use(express.json())
app.use(cookieParser());
app.use(cors());
app.use(helmet());

app.use('*', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})

mongoose.connect(process.env.DB_STRING).then( () => {
    app.use('/api/person',                  require('./routes/personRoute'));
    app.use('/api/doctors',                 require('./routes/doctorsRoute'));
    app.use('/api/recepcionist',            require('./routes/recepcionistRoute'));
    app.use('/api/laboratoryTechnician',    require('./routes/laboratoryTechnicianRoute'));
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}).catch(err => console.log(err))


