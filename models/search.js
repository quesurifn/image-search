var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Search = new Schema({
  searched_at: String,
  search_terms : String
});

var Search = mongoose.model('Search', Search);

module.exports = Search;
