var orm = require('../config/orm.js');

var burger = {
  selectAll: function (cb) {
    orm.selectAll('burgers', function (res){
      cb(res);
    });
  },
  insertOne: function (val, cb) {
    orm.insertOne('burgers', 'burger_name', val, function(res){
      cb(res);
    });
  },
  updateOne: function (colVal, conditionVal, cb) {
    orm.updateOne('burgers', 'devoured', colVal, 'ID', conditionVal, function(res){
      cb(res);
    });
  },
  deleteOne: function (conditionVal ,cb) {
    orm.deleteOne('burgers', 'ID', conditionVal, function(res){
      cb(res);
    });
  }
};

module.exports = burger;