
const PORT = 8000;
const { MongoClient} = require('mongodb')
const uri = 'mongodb+srv://sergiolm:zZ2Lx0i0ivnBuMEI@cluster0.taa3u.mongodb.net/Cluster0?retryWrites=true&w=majority'
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcrypt')


const app = express()

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.json('Hello to my app')
})

app.post('/signup', async (req, res) => {
    const client = new MongoClient(uri)
    const {email, password} = req.body

    const generatedUserId = uuidv4()
    const hashedPassword = await bcrypt.hash(password, 10)

    try{
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const existingUser = await users.findOne( {email})

        if( existingUser) {
            return res.status(409).send('user already exists. Please login')
        }

        const sanitizedEmail = email.toLowerCase()

        const data = {
            user_id : generatedUserId,
            email: sanitizedEmail,
            hashed_password : hashedPassword
        }
        const insertedUser = await users.insertOne(data)
        
        const token = jwt.sign(insertedUser, sanitizedEmail, {
            expiresIn : 60 * 24
        })

        res.status(201).json({token, userId: generatedUserId, email: sanitizedEmail})
    } catch(err){
        console.log("ERROR3")
    }

})

app.post('/login', async (req,res) => {
    const client = new MongoClient(uri)
    const {email, password} = req.body

    try{
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const user = await users.findOne({ email })

        const correctPassword = await bcrypt.compare(password,user.hashed_password)

        if( user && correctPassword){
            const token = jwt.sign(user, email, {
                expiresIn: 60*24 
            })
            res.status(201).json({ token, userId: user.user_id, email})

        }
        res.status(400).send('Invalid Credentials')
       

    }catch{
        console.log("ERROR2")
    }
})

app.get('/users', async (req, res) => {
    const client = new MongoClient(uri)
    try{
        await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const returnedUsers = await users.find().toArray()
        res.send(returnedUsers)
    } finally{
        await client.close()
    }
})


app.listen(PORT, () => console.log('Server running on PORT ' + PORT))

