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
        // await client.connect();
        const database = client.db("PHW-A-10");
        const campaign = database.collection("Campaign");
        const user = database.collection("User");
        const donation = database.collection("Donation")

        app.post("/user", async (req, res) => {
            const result = await user.insertOne(req.body);
            res.send(result)
        })

        app.get("/user", async (req, res) => {
            const data = await user.find().toArray()
            res.send(data)
        })
        app.get("/user/email/:email", async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const result = await user.findOne(query, {});
            console.log(result)
            if(result)res.send(result)
            else res.send({"isExist":false})
        })

        app.patch("/user/email/:email", async (req, res) => {
            const filter = { email: req.params.email };
            /* Set the upsert option to insert a document if no documents match
            the filter */
            const options = { upsert: true };
            // Specify the update to set a value for the plot field
            const updateDoc = {
                $set: req.body
                // $set: {
                //     plot: `A harvest of random numbers, such as: ${Math.random()}`
                // },
            };
            // Update the first document that matches the filter
            const result = await user.updateOne(filter, updateDoc, options);
            res.send(result)
        })

        app.get("/campaign", async (req, res) => {
            const cursor = campaign.find()
            const data = await cursor.toArray()
            res.send(data)
        })

        app.get("/campaign/id/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await campaign.findOne(query, {});
            res.send(result)
        })

        app.patch("/campaign/id/:id", async (req, res) => {
            const filter = { _id: new ObjectId(req.params.id) };
            /* Set the upsert option to insert a document if no documents match
            the filter */
            const options = { upsert: true };
            // Specify the update to set a value for the plot field
            const updateDoc = {
                $set: req.body
                // $set: {
                //     plot: `A harvest of random numbers, such as: ${Math.random()}`
                // },
            };
            // Update the first document that matches the filter
            const result = await campaign.updateOne(filter, updateDoc, options);
            res.send(result)
        })


        app.get("/campaign/email/:email", async (req, res) => {
            const email = req.params.email;
            const query = { organizerEmail: email };
            const result = await campaign.find(query, {}).toArray();
            console.log(result)
            res.send(result)
        })



        app.post("/campaign", async (req, res) => {
            const result = await campaign.insertOne(req.body);
            res.send(result)
        })

        app.delete("/campaign/id/:id", async (req, res) => {
            const query = { _id: new ObjectId(req.params.id) };
            const result = await campaign.deleteOne(query);
            res.send(result)
        })

        app.post("/donation", async (req, res) => {
            const result = await donation.insertOne(req.body);
            res.send(result)
        })

        app.get("/donation", async (req, res) => {
            const cursor = donation.find()
            const data = await cursor.toArray()
            console.log(data)
            res.send(data)
        })
        app.get("/donation/email/:email", async (req, res) => {
            const email = req.params.email;
            console.log(email)
            const query = { dEmail: email };
            console.log(query)
            const result = await donation.find(query, {}).toArray();
            console.log(result)
            res.send(result)
        })
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}

run().catch(console.dir);

app.listen(3000, () => console.log("running port is " + 3000))
// export default app;
