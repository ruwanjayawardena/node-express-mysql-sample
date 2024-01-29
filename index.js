const express = require('express');
const dotenv = require('dotenv');
const routes = require('./src/routes/town.routes');
const bodyParser = require('body-parser');

/** cors middleware which enable access for specific urls  */
var cors = require('cors');
//
/** dotenv configuration */
dotenv.config();

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express();

/** --- middleware --- */
app.use(cors(corsOptions));
/** bodyParser setup */
/** parse application/json */
//Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.This parser accepts any Unicode encoding of the body and supports automatic inflation of
app.use(bodyParser.json());
/** parse application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({ extended: true }));

/** routes setup */
routes(app);

/** startup route welcome message as a sample */
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Ruwan application." });
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});