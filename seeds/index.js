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
    for (let i = 0; i < 500; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const hotel = new Hotel({
            author: '6432d40cd9a74d6d33e9a9b0',
            title: `${sample(descriptors)} ${sample(places)}`,
            price: Math.floor(Math.random() * 20) + 10,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: 'Point', coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptate.',
            image: [
                {
                    url: 'https://res.cloudinary.com/dnbvjlyo7/image/upload/v1681484428/YelpCamp/hbp52uqqomkjll55x9uu.jpg',
                    filename: 'YelpCamp/hbp52uqqomkjll55x9uu',
                },
                {
                    url: 'https://res.cloudinary.com/dnbvjlyo7/image/upload/v1681484427/YelpCamp/n3kujokr1ue2i2fplimw.jpg',
                    filename: 'YelpCamp/n3kujokr1ue2i2fplimw',
                },
            ],
        })
        await hotel.save();
    }
}

seedDB().then(() => {
    mongo.connection.close();
})