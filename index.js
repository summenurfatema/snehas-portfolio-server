const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');



require('dotenv').config()

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6v5oj5d.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {

    try {
        const blogCollection = client.db('SnehaPoddar').collection('blogsCollection')
        const honorCollection = client.db('SnehaPoddar').collection('honorCollection')
        const joinTeamCollection = client.db('SnehaPoddar').collection('joinTeam')
        const aboutCollection = client.db('SnehaPoddar').collection('aboutCollection')
        const imageCollection = client.db('SnehaPoddar').collection('media')
        const videoCollection = client.db('SnehaPoddar').collection('videoCollection')



  //------------------------------Blog---------------------------------//

  // post of blogs
    app.post('/blogs', async (req, res) => {
        const blogBody = req.body
        const result = await blogCollection.insertOne(blogBody)
        res.send(result)

    })

    // get all blog 
    app.get('/all-blogs', async (req, res) => {
        const query = {}
        const allBlog = await blogCollection.find(query).sort({ _id: -1 }).toArray();
        res.send(allBlog)
    })

    // get all blog limit 6
    app.get('/all-blog', async (req, res) => {
        const query = {}
        const allBlog = await blogCollection.find(query).limit(6).sort({ _id: -1 }).toArray();
        res.send(allBlog)
    })

    // delete blog

    app.delete('/blog/:id', async (req, res) => {
    const id = req.params.id
    const query = { _id:new ObjectId(id) }
    const result = await blogCollection.deleteOne(query)
    res.send(result)
    })


    //-----------------------------------------Snearth-------------------------------//

    // post photo in gallery
    app.post('/media', async (req, res) => {
        const gallery = req.body
        const result = await imageCollection.insertOne(gallery)
        res.send(result)

    })
    // get all media
    app.get('/all-media', async (req, res) => {
        const query = {}
        const allMedia = await imageCollection.find(query).sort({ _id: -1 }).toArray()
        res.send(allMedia)
    })
     // get photo by id
     app.get('/gallery/:id', async (req, res) => {
      const id = req.params.id
          const query = { _id: new ObjectId(id) }
          const menuCard = await imageCollection.findOne(query)
          res.send(menuCard)
    });
    // delete media
    app.delete('/medias/:id', async (req, res) => {
        const id = req.params.id
        const query = { _id:new ObjectId(id) }
        const result = await imageCollection.deleteOne(query)
        res.send(result)
    })

      // update image caption
      app.put("/change-caption/:id", async (req, res) => {
        const id = req.params.id;
        const update = req.body;
        const filter = { _id: new ObjectId(id) };
        const option = { upsert: true };
        const updateDoc = {
          $set: {
            description: update.description,
          },
        };
        const result = await imageCollection.updateOne(
          filter,
          updateDoc,
          option
        );
        res.send(result);
      })

// get video
  app.get('/video', async (req, res) => {
    const query = {}
    const about = await videoCollection.find(query).sort({ _id: -1 }).toArray()
    res.send(about)
})
// upload from youtube
app.post('/youtube-upload', async (req, res) => {
  const videoReq = req.body
  const result = await videoCollection.insertOne(videoReq)
  res.send(result)

})
// post video
app.post('/post-video', async (req, res) => {
  const videoReq = req.body
  const result = await videoCollection.insertOne(videoReq)
  res.send(result)

})
 // delete video
    app.delete('/delete-video/:id', async (req, res) => {
        const id = req.params.id
        const query = { _id:new ObjectId(id) }
        const result = await videoCollection.deleteOne(query)
        res.send(result)
    })

    //------------------------------------About-----------------------------------//
// update 1st about
app.put("/about-image/:id", async (req, res) => {
  const id = req.params.id;
  const update = req.body;
  const filter = { _id: new ObjectId(id) };
  const option = { upsert: true };
  const updateDoc = {
    $set: {
    image:update.image,
    },
  };
  const result = await aboutCollection.updateOne(
    filter,
    updateDoc,
    option
  );
  res.send(result);
});
    //get about data
    app.get('/about', async (req, res) => {
        const query = {}
        const about = await aboutCollection.find(query).toArray()
        res.send(about)
    })
   

    // update 1st about
    app.put("/first-about/:id", async (req, res) => {
        const id = req.params.id;
        const update = req.body;
        const filter = { _id: new ObjectId(id) };
        const option = { upsert: true };
        const updateDoc = {
          $set: {
          first:update.first,
          },
        };
        const result = await aboutCollection.updateOne(
          filter,
          updateDoc,
          option
        );
        res.send(result);
      });

    // update middle about
    app.put("/middle-about/:id", async (req, res) => {
        const id = req.params.id;
        const update = req.body;
        const filter = { _id:new ObjectId(id) };
        const option = { upsert: true };
        const updateDoc = {
          $set: {
          middle:update.middle,
          },
        };
        const result = await aboutCollection.updateOne(
          filter,
          updateDoc,
          option
        );
        res.send(result);
      });

    // update 1st about
    app.put("/last-about/:id", async (req, res) => {
        const id = req.params.id;
        const update = req.body;
        const filter = { _id:new ObjectId(id) };
        const option = { upsert: true };
        const updateDoc = {
          $set: {
          last:update.last,
          },
        };
        const result = await aboutCollection.updateOne(
          filter,
          updateDoc,
          option
        );
        res.send(result);
      });



    //-------------------------------------------Honor-------------------------------//
    //get honor
    app.get('/honor', async (req, res) => {
        const query = {}
        const honor = await honorCollection.find(query).toArray()
        res.send(honor)
    })


    //post honor
    app.put("/honors/:id", async (req, res) => {
    const id = req.params.id;
    const { honor } = req.body;
    const filter = { _id:new ObjectId(id) };
    const updateDoc = {
      $push: { honor: honor }
    };
    const result = await honorCollection.findOneAndUpdate(filter, updateDoc);
    res.send(result);
    });



  //---------------------------------Join team req-------------------------------//
  
  //get requirments
  app.get('/join-team', async (req, res) => {
    const query = {}
    const joinTeam = await joinTeamCollection.find(query).toArray()
    res.send(joinTeam)
})
  //update join team 1st requirment
  app.put('/first-requirment/:id', async (req, res) => {
    const id = req.params.id;
    const newReq = req.body.requirmentes;
    const filter = { _id:new ObjectId(id) };
    const update = { $set: { 'requirmentes.0': newReq } };
    const options = { returnOriginal: false };
    const result = await joinTeamCollection.findOneAndUpdate(filter, update, options);
    res.json(result.value);
  });


  //update join team 2nd requirment
  app.put('/second-requirment/:id', async (req, res) => {
    const id = req.params.id;
    const newReq = req.body.requirmentes;
    const filter = { _id:new ObjectId(id) };
    const update = { $set: { 'requirmentes.1': newReq } };
    const options = { returnOriginal: false };
    const result = await joinTeamCollection.findOneAndUpdate(filter, update, options);
    res.json(result.value);
  });


  //update join team 1st requirment
  app.put('/third-requirment/:id', async (req, res) => {
    const id = req.params.id;
    const newReq = req.body.requirmentes;
    const filter = { _id:new ObjectId(id) };
    const update = { $set: { 'requirmentes.2': newReq } };
    const options = { returnOriginal: false };
    const result = await joinTeamCollection.findOneAndUpdate(filter, update, options);
    res.json(result.value);
  });

   //post new join team req
   app.put("/new-requirment/:id", async (req, res) => {
    const id = "642e6aa855d433da7464a787";
    const { requirmentes } = req.body;
    const filter = { _id:new ObjectId(id) };
    const updateDoc = {
      $push: { requirmentes: requirmentes }
    };
    const options = { returnDocument: "after" }; // <-- Add this option
    const result = await joinTeamCollection.findOneAndUpdate(filter, updateDoc, options);
    res.send(result);
  });
 
    }
    finally {
       

    }
}
run().catch(err => console.error(err))





app.get('/', (req, res) => {
    res.send('Portfolio Server!!')
})
app.listen(port, () => {
    console.log(`Portfolio server running on ${port}`)
})