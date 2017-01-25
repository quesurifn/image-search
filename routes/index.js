var express = require('express');
var mongoose = require('mongoose');
var Search = require('../models/search');
var imageSearch = require('node-google-image-search');
require('dotenv').config()
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/api/:terms', function(req, res) {
  var terms = req.params.terms; //save query to variable
  var results = imageSearch(terms, callback, 0, 10);
  function callback(results) {
    res.json(results); //send JSON response to client
  }
  var newSearch = Search();
  newSearch.searched_at = new Date();
  newSearch.search_terms = req.params.terms;
  console.log(req.params.terms);
  newSearch.save(function(err) { //Save new schema
    if (err) {
      throw err;
  } else {
    console.log("Search Saved!");
  }
  });
});

router.get('/history', function(req, res) {
  var results = Search.find().sort('-searched_at').limit(3).exec(function(err, searches){
    if (err)
      return res.send();
      res.json(searches);
    });
});


module.exports = router;
