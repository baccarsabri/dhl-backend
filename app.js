const express = require("express");
const mongoose = require("./middleware/connect");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);

app.listen(process.env.PORT || 8000, () => {
    console.log("Server up!");
});