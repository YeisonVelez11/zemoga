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
    return res.status(200).json(data);
  });
});


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
  let positiveVote = ruling.votes.positive;
  let negativeVote = ruling.votes.negative;
  let totalPercentage = ruling.votes.positive + ruling.votes.negative;
  if (thumb == "positive") {
    positiveVote = ruling.votes.positive + 1;
    ruling.set("votes.positive", positiveVote);
    ruling.set("thumb", "positive");
    ruling.set("votes.positive_percentage", ((positiveVote * 100) / totalPercentage).toFixed(1));
    ruling.set("votes.negative_percentage", ((negativeVote * 100) / totalPercentage).toFixed(1));

  }
  else if (thumb == "negative") {
    negativeVote = ruling.votes.negative + 1;
    ruling.set("votes.negative", negativeVote);
    ruling.set("thumb", "negative");
    ruling.set("votes.positive_percentage", ((positiveVote * 100) / totalPercentage).toFixed(1));
    ruling.set("votes.negative_percentage", ((negativeVote * 100) / totalPercentage).toFixed(1));

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
