const express = require("express");
const app = express();
const Ruling = require('../models/rulings');

app.get('/list', [], (req, res) => {
  Ruling.find({}, (err, data) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }
    return res.status(200).json({
      ok: true,
      data
    });
  });
});

app.post('/registro', [], function (req, res) {

  let ruling = new Ruling(
    {
      "name": "Kanye West",
      "description": "Born in Atlanta and raised in Chicago, West was first known as a producer for Roc-A-Fella Records in the early 2000s, producing singles for several mainstream artists.",
      "category": "entertainment",
      "picture": "kanye.png",
      "lastUpdated": new Date(),
      "votes": {
        "positive": 23,
        "negative": 36
      },
      "thumb": "positive"
    });

  ruling.save((err, RulingDB) => {
    return res.status(200).json({
      ok: false,
      err,
      data: RulingDB
    });
  });
});


app.put('/update_ruling/:_id', async function (req, res) {

  console.log(req.params);
  console.log(req.body);
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
  let positiveVote = ruling.votes.positive;
  let negativeVote = ruling.votes.negative;
  let totalPercentage = ruling.votes.positive + ruling.votes.negative;
  if (thumb == "positive") {
    positiveVote = ruling.votes.positive + 1;
    ruling.set("votes.positive", positiveVote);
    ruling.set("thumb", "positive");
    ruling.set("votes.positive_percentage", parseInt((positiveVote * 100) / totalPercentage));
    ruling.set("votes.negative_percentage", parseInt((negativeVote * 100) / totalPercentage));

  }
  else if (thumb == "negative") {
    let negativeVote = ruling.votes.negative + 1;
    ruling.set("votes.negative", negativeVote);
    ruling.set("thumb", "negative");
    ruling.set("votes.positive_percentage", parseInt((positiveVote * 100) / totalPercentage));
    ruling.set("votes.negative_percentage", parseInt((negativeVote * 100) / totalPercentage));

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
    return res.status(200).json({
      ok: true,
      data: RulingDB
    });
  })

});


module.exports = app;
