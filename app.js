    const express = require("express"); // npm i express
    const path = require("path"); // npm i path
    // require('dotenv').config() //npm i dotenv
    const app = express();


    app.set('view engine', 'ejs'); // npm i ejs
    app.use(express.urlencoded({ extended: true })) //npm i body-parser
    app.use(express.static(path.join(__dirname,'public')))
    app.set('views', path.join(__dirname, '/views'));

    app.get('/', (req, res) => { 
    res.render('TripHive Home');
    })

    app.listen(3000,() => {
    console.log('Server is running on port',3000);
    })