const express = require('express');
const cors = require('cors');
const app = express()
require("dotenv").config()
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ub9uewl.mongodb.net/?appName=Cluster0`;

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
        const database = client.db("PHW-A-10");
        const campaign = database.collection("Campaign");
        const user = database.collection("User");

        app.post("/user", async (req, res) => {
            const result = await user.insertOne(req.body);
            res.send(result)
        })

        app.get("/user/:email",async(req,res)=>{
            const email=req.params.email;
            const query = { email: email };
            const result = await campaign.findOne(query,{});
            res.send(result)
        })

        app.get("/campaign", async (req, res) => {
            const cursor = campaign.find()
            const data = cursor.toArray()
            res.send(data)
        })

        app.get("/campaign/id/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id)};
            const result = await campaign.findOne(query, {});
            res.send(result)
        })

        app.get("/campaign/email/:email", async (req, res) => {
            const email=req.params.email;
            const query = { email: email };
            const result = await campaign.find(query,{}).toArray();
            res.send(result)
        })
        app.post("/campaign", async (req, res) => {
            const result = await campaign.insertOne(req.body);
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


console.log(process.env.DB_USER)
app.get("/", (req, res) => res.send("hello"))
// app.listen(3000, () => console.log("hello"))
export default app;