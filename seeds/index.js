const mongo = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Hotel = require('../models/hotel');
const Review = require('../models/review');
require('dotenv').config();

mongo.set('strictQuery', false)
mongo.connect('mongodb://127.0.0.1:27017/triphive');

const db = mongo.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Hotel.deleteMany({});
    await Review.deleteMany({});
    for (let i = 0; i < 30; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const hotel = new Hotel({
            //YOUR USER ID
            title: `${sample(descriptors)} ${sample(places)}`,
            price: Math.floor(Math.random() * 20) + 10,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.',
            image: 'https://source.unsplash.com/collection/483251',
        })
        await hotel.save();
    }
}

seedDB().then(() => {
    mongo.connection.close();
})