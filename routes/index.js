var router = require('express').Router();
var Promise = require('bluebird');

var models = require('../models');
var Place = models.Place;
var Hotel = models.Hotel;
var Activity = models.Activity;
var Restaurant = models.Restaurant;




router.get('/', function(req,res,next){
    var hotelList = Hotel.find({}).exec();
    var activityList = Activity.find({}).exec();
    var restaurantList = Restaurant.find({}).exec();
    Promise.all([hotelList, activityList, restaurantList])
    .then(function(data){
        //console.log(data);       
        //res.json(data);
        var hotels = data[0];
        var activities = data[1];
        var restaurants = data[2];
        res.render('index', {hotels: hotels, 
                            activities: activities,
                            restaurants: restaurants});
    })
});



module.exports = router;