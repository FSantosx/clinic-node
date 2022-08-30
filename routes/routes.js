const 
START       = true
, express   = require('express')
, router    = express.Router()
, User     = require('../lib/models/user');
;;
// https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/
//Post Method
router.post('/post/Users', async (req, res) => {
    const data = new User({
        name: req.query.name,
        username: req.query.username,
        password: req.query.password,
        email: req.query.email,
        userType: req.query.userType
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send(req.params.id)
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})

module.exports = router;