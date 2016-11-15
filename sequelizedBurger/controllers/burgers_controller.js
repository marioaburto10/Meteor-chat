var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

router.get('/', function (req, res){
  res.redirect('/burgers');
});

router.get('/burgers', function(req, res){
  burger.selectAll(function(data){
    res.render('index', {burgers: data});
  });
});

router.post('/burgers/create', function(req, res){
  burger.insertOne([req.body.burgerInput], function(){
    res.redirect('/burgers');
  });

});

router.put('/burgers/update/:ID', function(req, res){
  burger.updateOne([req.body.devoured], [req.params.ID], function(){
    res.redirect('/burgers');
  });
});

router.delete('/burgers/delete/:ID', function(req, res){
  console.log(req.params.ID)
  burger.deleteOne([req.params.ID], function(){
    res.redirect('/burgers');
  });
});

module.exports = router;