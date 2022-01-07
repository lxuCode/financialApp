const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const usersRoute = require("./routes/users");
const categoriesRoute = require("./routes/categories");
const spendingsRoute = require("./routes/spendings");

const app = express();
dotenv.config();

app.listen(5000, () => {
	console.log("Server is running");
});

const login = process.env.DB_LOGIN;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const db_name =
	process.env.NODE_ENV === "test"
		? process.env.DB_NAME_TEST
		: process.env.DB_NAME_DEV;

console.log(host);

mongoose.connect(`mongodb://${login}:${password}@${host}/${db_name}`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection.error :"));
db.once("open", () => {
	console.log("Connection is established");
});

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/users", usersRoute);
app.use("/categories", categoriesRoute);
app.use("/spendings", spendingsRoute);
