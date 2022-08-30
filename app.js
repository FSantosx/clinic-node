require('dotenv').config();

const 
START           = true
, PORT          = 3000
, express       = require('express')
, app           = express()
, mongoose      = require('mongoose')
, database      = mongoose.connection
, routes        = require("./routes/routes")
;;

require('./lib/constants');
mongoose.connect(process.env.DATABASE_URL);

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => console.log(`SERVER STARTED AT LOCALHOST ${PORT}`))