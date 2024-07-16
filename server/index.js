const express = require("express");
const app = express();
const port = process.env.PORT || 3005;
const cors = require("cors");

// const dotenv = require("dotenv");
// dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://allenciaraa:GqQVJsVJ06S953AE@meal-planner.brv1b9h.mongodb.net/?retryWrites=true&w=majority&appName=meal-planner";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const recipeCollection = client.db("RecipeBook").collection("recipes");

    // insert recipe
    app.post("/upload-recipe", async (req, res) => {
      const data = req.body;
      const result = await recipeCollection.insertOne(data);
      res.send(result);
    });

    // update recipe data
    app.patch("/recipe/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const updateRecipeData = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updateDoc = {
        $set: {
          ...updateRecipeData,
        },
      };

      const result = await recipeCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    // delete recipe
    app.delete("/recipe/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await recipeCollection.deleteOne(filter);
      res.send(result);
    });

    // find by tag
    app.get("/all-recipes", async (req, res) => {
      let query = {};
      if (req.query?.meal) {
        query = { meal: req.query.meal };
      }
      const result = await recipeCollection.find(query).toArray();
      res.send(result);
    });

    // get individual recipe
    app.get("/recipe/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await recipeCollection.findOne(filter);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
  //   console.log(process.env.URI);
});
