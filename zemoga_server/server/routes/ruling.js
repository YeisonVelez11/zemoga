const express = require("express");
const app = express();
const Ruling = require('../models/rulings');
/**
  * @swagger
  *  /list/:
  *  get:
  *   summary: get all ruling data
  *   responses:
  *       '200':
  *        content:
  *            schema:
  *              type: object
  *              example: [{"thumb":"negative","temp_thumb":null,"_id":"60f9c236b1bd7e489c5e9100","name":"Kanye West","description":"Born in Atlanta and raised in Chicago, West was first known as a producer for Roc-A-Fella Records in the early 2000s, producing singles for several mainstream artists.","category":"Entertainment","picture":"https://i.blogs.es/7c43cd/elon-musk-no-queria-ser-ceo-e-hizo-todo-lo-posible-para-evitarlo-pero-asegura-que-sin-el-tesla-moriria___/450_1000.jpg","lastUpdated":"2021-07-22T19:08:38.166Z","votes":{"positive":4,"negative":67,"positive_percentage":"5.7","negative_percentage":"95.7"},"__v":0}]
  *
  */
app.get('/list', [], (req, res) => {
  Ruling.find({}, (err, data) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }
    return res.status(200).json(data);
  });
});

/**
  * @swagger
  *  /update_ruling/{_id}:
  *  put:
  *   summary: update specific ruling data
  *   parameters:
  *     - name: thumb
  *       in: body
  *       required: true
  *       example: negative, positive,  reset
  *       description: vote of ruling
  *     - name: _id
  *       in: path
  *       required: true
  *       description: id of ruling data
  *       example: '60f9c236b1bd7e489c5e9100'
  *   responses:
  *       '200':
  *        content:
  *            schema:
  *              type: object
  *              example: {"thumb":"negative","temp_thumb":null,"_id":"60f9c236b1bd7e489c5e9100","name":"Kanye West","description":"Born in Atlanta and raised in Chicago, West was first known as a producer for Roc-A-Fella Records in the early 2000s, producing singles for several mainstream artists.","category":"Entertainment","picture":"https://i.blogs.es/7c43cd/elon-musk-no-queria-ser-ceo-e-hizo-todo-lo-posible-para-evitarlo-pero-asegura-que-sin-el-tesla-moriria___/450_1000.jpg","lastUpdated":"2021-07-22T19:08:38.166Z","votes":{"positive":4,"negative":68,"positive_percentage":"5.6","negative_percentage":"95.8"},"__v":0}
  *
  */
app.put('/update_ruling/:_id', async function (req, res) {

  let { thumb } = req.body;
  let ruling;
  try {
    ruling = await Ruling.findOne({ "_id": req.params._id });
  }
  catch (e) {
    return res.status(500).json({
      ok: false,
      err: "id is invalid"
    })
  }
  if (!ruling) {
    return res.status(500).json({
      ok: false,
      err: "There is not data with this id"
    });
  }

  if (thumb == "positive") {
    let positiveVote = ruling.votes.positive + 1;
    let totalPercentage = positiveVote + ruling.votes.negative;
    ruling.set("votes.positive", positiveVote);
    ruling.set("thumb", "positive");
    ruling.set("votes.positive_percentage", ((positiveVote * 100) / totalPercentage).toFixed(0));
    ruling.set("votes.negative_percentage", ((ruling.votes.negative * 100) / totalPercentage).toFixed(0));

  }
  else if (thumb == "negative") {
    let negativeVote = ruling.votes.negative + 1;
    let totalPercentage = ruling.votes.positive + negativeVote;
    ruling.set("votes.negative", negativeVote);
    ruling.set("thumb", "negative");
    ruling.set("votes.positive_percentage", ((ruling.votes.positive * 100) / totalPercentage).toFixed(0));
    ruling.set("votes.negative_percentage", ((negativeVote * 100) / totalPercentage).toFixed(0));
  }
  else {
    ruling.set("thumb", null);
  }

  ruling.save((err, RulingDB) => {

    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }
    return res.status(200).json(
      RulingDB
    );
  })

});


module.exports = app;
