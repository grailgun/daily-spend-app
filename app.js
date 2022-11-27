// Import
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// app
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const mainRoute = require("./routes/index.js");
app.use("/api", mainRoute);

// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
	console.log(`Server is connected to port : ${PORT}`);
	await sequelize.sync();
	console.log("Database Sync");
});
