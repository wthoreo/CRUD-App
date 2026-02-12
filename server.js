require('dotenv').config();
const express = require('express');
const{MongoClient, ObjectId} = require('mongodb');
const bodyParser = require('body-parser');
const app =express();

app.use(bodyParser.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
const url = process.env.MONGODB_URL;
const dbName = process.env.DB_NAME;
let db;

async function startServer() {
    try{
        const client = new MongoClient(url);
        await client.connect();

        db = client.db(dbName);
        console.log('Connected to MongoDB')

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        });
    }
    catch(err){
        console.error("MongoDB connection failed:", err);
    }
}

startServer();

// CRUD api routes
//create user
app.post('/api/users', async (req, res) => {
    const user = req.body;
    const result = await db.collection('users').insertOne(user);
    res.json(result);
});

//read users
app.get('/api/users', async (req, res) => {
    const users = await db.collection('users').find().toArray();
    res.json(users);
});

//update user
app.put('/api/users/:id', async (req, res) =>{
    const id = req.params.id;
    const updatedUser = req.body;
    const result = await db.collection('users').updateOne(
        {_id: new ObjectId(id)},
        {$set: updatedUser}
    );
    if (result.matchedCount ===0) {
        return res.status(404).json({error: "User not found"});
    }
    res.json(result);
});

//delete user
app.delete('/api/users/:id', async(req, res) =>{
    const id = req.params.id;
    const result = await db.collection('users').deleteOne(
        {_id: new ObjectId(id)}
    );
    if (result.deletedCount === 0){
        return res.status(404).json({error: "User not found thus couldn't be deleted"})
    }
    res.json(result);
})

