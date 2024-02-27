const express = require('express')
const app = express()
const port = process.env.PORT || 7000;
const cors = require('cors')


// middleWare
app.use(cors())
app.use(express.json());


app.get('/', (req, res) => {
  res.send(`<h1 style="color:blue">mern-project server running successfully and waiting for client request<h1/>`)
})


// mongodb configuration

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://mern-project:mernproject@cluster0.wb8ymdh.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // create  a collection of database
    const gameCollection = client.db("GameInventory").collection("games");

    // insert a game to the database : post method  
    app.post('/upload-game', async (req, res, next) => {
      try {
        const data = req.body; // Assuming an array of games is sent in the request body
        console.log("Received data:", data);
    
        const result = await gameCollection.insertMany(data);
        console.log("Games uploaded successfully:", result);
    
        res.status(201).json({ message: "Games uploaded successfully", data: result.ops });
      } catch (error) {
        console.error("MongoDB Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
        next(error); // Pass the error to the error-handling middleware
      }
    });

    // get allGames from database
    app.get("/all-game",async(req,res)=>{
      const games =  gameCollection.find()
      const result = await games.toArray();
      res.send(result)
    })

    // update a game data : patch or update methods
   app.patch("/game/:id",async(req,res)=>{
    const id = req.params.id;
    /* console.log(id); */
    const updateGameData = req.body;
    const filter = {_id:new ObjectId(id)};
    const options = { upsert: true };

    const updateDoc = {
      $set: {
        ...updateGameData
      }
    };
      // update
      const result = await gameCollection.updateOne(filter,updateDoc,options);
      res.send(result)
   })

  //  delete a data from database
  app.delete("/game/:id",async(req,res)=>{
    const id = req.params.id;
    const filter = {_id: new ObjectId(id)};
    const result = await gameCollection.deleteOne(filter);
    res.send(result)
  })

  // find by category
  app.get("/all-game",async(req,res)=>{
    let query = {};
    if(req.query?.category){
      query = {category:req.query.category}
    }
    const result = await gameCollection.find(query).toArray()
    res.send(result);
  })

  // to get single game data
  app.get("/game/:id",async(req,res) =>{
    const id = req.params.id;
    const filter = {_id: new ObjectId(id)}
    const result = await gameCollection.findOne(filter);
    res.send(result)
  }) 

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally{
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})