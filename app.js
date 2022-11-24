// Import
const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//require("dotenv").config();

// app
const app = express();
// app.use(cors());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());

// const mainRoute = require("./routes/index.js");
// app.use("/api", mainRoute);

app.use("/", (req, res) => {
	res.json({
		message: "Hello world",
	});
});

// Listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
	console.log(`Server is connected to port : ${PORT}`);
	// await sequelize.authenticate();
	// console.log("Database Sync");
});
