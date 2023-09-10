<div align="center">
  
![][views] ![][stars] ![][forks] ![][issues] ![][license] ![][repo-size]
  
<!-- logo/title -->
  
<br>
<picture>
  <source media="(prefers-color-scheme: dark, (width:600px))" srcset="./public/assets/triphive.png">
  <source media="(prefers-color-scheme: light,(width:600px))" srcset="./public/assets/triphive-black.png">
  <img src="./public/assets/triphive.png" width="600px" alt="triphive">
</picture>
<br>
  
### 🏨A hotel review website that allows users to find hotels and leave reviews📝 for them

### 🔁In return user get rewarded 🪙 for their valuable reviews✅

## ⚙️Dependencies Used

---

**[<kbd> <br> **@mapbox/mapbox-sdk** ^0.15.0 <br> </kbd>][mapbox]**&nbsp;&nbsp;
**[<kbd> <br> **cloudinary:** ^1.36.1 <br> </kbd>][cloudinary]**&nbsp;&nbsp;
**[<kbd> <br> **passport:** ^0.6.0 <br> </kbd>][passport]**&nbsp;&nbsp;
**[<kbd> <br> **multer:** ^1.4.5-lts.1 <br> </kbd>][multer]**&nbsp;&nbsp;
**[<kbd> <br> **express:** ^4.18.2 <br> </kbd>][express]**&nbsp;&nbsp;
**[<kbd> <br> **mongoose:** ^6.9.2 <br> </kbd>][mongoose]**&nbsp;&nbsp;
**[<kbd> <br> **path:** ^0.12.7 <br> </kbd>][path]**&nbsp;&nbsp;
**[<kbd> <br> **joi:** ^17.9.1 <br> </kbd>][joi]**&nbsp;&nbsp;
**[<kbd> <br> **ejs:** ^3.1.9 <br> </kbd>][ejs]**&nbsp;&nbsp;
**[<kbd> <br> **sanitize-html:** ^2.10.0 <br> </kbd>][sanitize-html]**&nbsp;&nbsp;
**[<kbd> <br> **express-mongo-sanitize:** ^2.2.0 <br> </kbd>][express-mongo-sanitize]**&nbsp;&nbsp;

---

## 📸 Screen Shots

<br>

| Landing Page | Home Page   |
| ------------ | ----------- |
| ![landing]   | ![homepage] |

| Hotel Detail | Reward Section |
| ------------ | -------------- |
| ![hotel]     | ![reward]      |

| New Hotel Page | Edit Hotel Page |
| -------------- | --------------- |
| ![new]         | ![edit]         |

| Register Page | Login Page |
| ------------- | ---------- |
| ![register]   | ![login]   |

<br>
</div>
<div align='center'>

## 🛠️Building from Source

</div>

- ⬇️Fetch latest source code from master branch.

```console

[khushal@arch]$ git clone https://github.com/Khushal-ag/TripHive.git
[khushal@arch]$ cd TripHive

```

- 👌Create **.env** file & add your own **CONFIGS**

```js

SESSION_SECRET = <Your_session_secret>
MONGO_URI = <Your_database_url>
PORT = <Port_number>

CLOUDINARY_CLOUD_NAME = <Your_cloud_name>
CLOUDINARY_API_KEY = <Your_api_key>
CLOUDINARY_SECRET = <Your_secret>

MAPBOX_TOKEN = <Your_Mapbox_Token>

```

- 👟Run the Website with 🆚Code **or** 💻Command Line :

```console

[khushal@arch TripHive]$ yarn
[khushal@arch TripHive]$ yarn start

```

<div align="center">

## 📂Directory Structure

</div>

```
|-- CODE_OF_CONDUCT.md
|-- LICENSE
|-- README.md
|-- app.js
|-- cloudinary
|   `-- index.js
|-- controllers
|   |-- hotels.js
|   |-- reviews.js
|   |-- shop.js
|   `-- users.js
|-- models
|   |-- hotel.js
|   |-- review.js
|   `-- user.js
|-- package.json
|-- public
|   |-- assets
|   |   |-- coin.png
|   |   |-- gradient.jpg
|   |   |-- products
|   |   |   |-- amazon500.png
|   |   |   |-- flipkart.png
|   |   |   |-- h&m.png
|   |   |   |-- myntra.jpeg
|   |   |   |-- nike.png
|   |   |   `-- starbucks.png
|   |   |-- triphive-black.png
|   |   |-- triphive-favicon.png
|   |   |-- triphive-img.png
|   |   `-- triphive.png
|   |-- javascripts
|   |   |-- clusterMap.js
|   |   |-- showMap.js
|   |   `-- validateForm.js
|   `-- stylesheets
|       |-- home.css
|       |-- map.css
|       |-- nav.css
|       |-- pageNotFound.css
|       |-- shop.css
|       `-- stars.css
|-- routes
|   |-- hotelRoutes.js
|   |-- reviewRoutes.js
|   |-- shopRoutes.js
|   `-- userRoutes.js
|-- schemas.js
|-- utils
|   |-- catchAsync.js
|   |-- expressError.js
|   `-- middlewares.js
|-- views
|   |-- error.ejs
|   |-- home.ejs
|   |-- hotel
|   |   |-- edit.ejs
|   |   |-- index.ejs
|   |   |-- new.ejs
|   |   `-- show.ejs
|   |-- layouts
|   |   `-- boilerplate.ejs
|   |-- pageNotFound.ejs
|   |-- partials
|   |   |-- flash.ejs
|   |   |-- footer.ejs
|   |   |-- navbar.ejs
|   |   `-- stars.ejs
|   |-- shop
|   |   `-- index.ejs
|   `-- user
|       |-- login.ejs
|       `-- register.ejs
`-- yarn.lock
```

<div align='center'>

## ☢️Contributors

[![][contributors]][contributors-graph]

_Note: It may take up to 24h for the [contrib.rocks][contrib-rocks] plugin to update because it's refreshed once a day._

</div>

<p align="center">
<img width="150%" src="https://camo.githubusercontent.com/6038c8f1fd8f60de75477470e5a87210e9256202e01dfba9986446304a0f0254/68747470733a2f2f63617073756c652d72656e6465722e76657263656c2e6170702f6170693f747970653d776176696e6726636f6c6f723d6772616469656e74266865696768743d36302673656374696f6e3d666f6f746572">
</p>

<!----------------------------------{ Labels }--------------------------------->

[views]: https://komarev.com/ghpvc/?username=TripHive&label=view%20counter&color=red&style=flat
[repo-size]: https://img.shields.io/github/repo-size/Khushal-ag/TripHive
[issues]: https://img.shields.io/github/issues-raw/Khushal-ag/TripHive
[license]: https://img.shields.io/github/license/Khushal-ag/TripHive
[forks]: https://img.shields.io/github/forks/Khushal-ag/TripHive?style=flat
[stars]: https://img.shields.io/github/stars/Khushal-ag/TripHive
[contributors]: https://contrib.rocks/image?repo=Khushal-ag/TripHive&max=500
[contributors-graph]: https://github.com/Khushal-ag/TripHive/graphs/contributors
[contrib-rocks]: https://contrib.rocks/preview?repo=Khushal-ag%2FTripHive

<!-----------------------------{ Dependencies Used }---------------------------->

[mapbox]: https://www.npmjs.com/package/@mapbox/mapbox-sdk
[cloudinary]: https://www.npmjs.com/package/cloudinary
[passport]: https://www.npmjs.com/package/passport
[multer]: https://www.npmjs.com/package/multer
[express]: https://www.npmjs.com/package/express
[mongoose]: https://www.npmjs.com/package/mongoose
[path]: https://www.npmjs.com/package/path
[joi]: https://www.npmjs.com/package/joi
[ejs]: https://www.npmjs.com/package/ejs
[sanitize-html]: https://www.npmjs.com/package/sanitize-html
[express-mongo-sanitize]: https://www.npmjs.com/package/express-mongo-sanitize

<!----------------------------------{ Images }--------------------------------->

[landing]: https://graph.org/file/17cea01409d517ec8614b.png
[homepage]: https://graph.org/file/5496aa1234f629edb3d63.png
[hotel]: https://graph.org/file/365f262d8114e8cd2432a.png
[reward]: https://graph.org/file/8fd4d2cac55a7667a2759.png
[login]: https://graph.org/file/55aa6c045848ddb1c19b9.png
[register]: https://graph.org/file/b13e90c173d3db9a8e219.png
[edit]: https://graph.org/file/bba7b693d62f775c91ce2.png
[new]: https://graph.org/file/5d617077c9dfdbd6e268a.png
