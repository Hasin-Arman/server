const express = require('express')
const app = express()
const cors=require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.23pjc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
app.get('/', (req, res) => {
  res.send('Hello World!')
})
console.log(process.env.DB_USER)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const eventCollection = client.db("volunteer").collection("events");


  app.post('/addEvent',(req,res)=>{
      const event=req.body;
      eventCollection.insertOne(event)
      .then(result=>{
          console.log(result.insertedCount);
          res.send(result.insertedCount>0)
      })
  })

  app.get('/events',(req,res)=>{
      eventCollection.find({})
      .toArray((err,documents)=>{
          res.send(documents); 
      })

  })
  
});


app.listen(port);