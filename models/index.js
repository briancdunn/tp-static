var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tp-static');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error: '));

var placeSchema = new mongoose.Schema({
  address: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  phone: {
    type: String
  },
  location: {
    type: [Number],
    required: true,
    validate: [arrayLimit, '{PATH} must equal 2']
  }
});

var hotelSchema = new mongoose.Schema({
  name: {
    type: String
  },
  place: {
    // type: [mongoose.Schema.Types.ObjectId],
    // ref: 'Place'
    type: [placeSchema]
  },
  num_stars: {
    type: Number,
    validate: [oneToFiveLimit, '{PATH} must be between 1 and 5']
  },
  amenities: {
    type: String
  }
});

var activitySchema = new mongoose.Schema({
  name: {
    type: String
  },
  place: {
    type: [placeSchema]
  },
  age_range: {
    type: String
  }
});

var restaurantSchema = new mongoose.Schema({
  name: {
    type: String
  },
  place: {
    type: [placeSchema]
  },
  cuisines: {
    type: String
  },
  price: {
    type: Number,
    validate: [oneToFiveLimit, '{PATH} must be between 1 and 5']
  }
})

function arrayLimit(val) {
  return val.length === 2;
}

function oneToFiveLimit(val) {
  return val >= 1 && val <= 5;
}

hotelSchema.virtual('amenitiesArr').get(function() {
  return this.amenities.split(', ');
});

var Place = mongoose.model('Place', placeSchema);
var Hotel = mongoose.model('Hotel', hotelSchema);
var Activity = mongoose.model('Activity', activitySchema);
var Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = {
  Place: Place,
  Hotel: Hotel,
  Activity: Activity,
  Restaurant: Restaurant
}