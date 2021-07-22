const express = require("express");
const app = express();
const Ruling = require('../models/rulings');

app.get('/list', [], (req, res) => {
  console.log("llega");
   Ruling.find({},  (err, data) => {
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

  console.log("dasa");
  let ruling = new Ruling(
    {
        "name" : "Kanye West",
        "description" : "Born in Atlanta and raised in Chicago, West was first known as a producer for Roc-A-Fella Records in the early 2000s, producing singles for several mainstream artists.",
        "category" : "entertainment",
        "picture" : "kanye.png",
        "lastUpdated" : new Date(),
        "votes" : {
            "positive" : 23,
            "negative" : 36
        },
        "votes" : {
            "positive" : {
                "type" : 2
            },
            "negative" : {
                "type" : 6
            }
        },
        "thumb" : "positive"
    });

  ruling.save((err, RulingDB) => {
    console.log(err);
    console.log(RulingDB);


                  return res.status(200).json({
                      ok: false,
                      err,
                      data:RulingDB
                  });
              });
     


});

module.exports = app;
