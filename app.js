const express = require("express");
const mongoose = require("./middleware/connect");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require('./routes/user');
const userController = require('./controller/user');
const adminRoutes = require('./routes/admin');
const app = express();



app.use(bodyParser.json());
app.use(cors());
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);

const server = require("http").Server(app);
app.set("view engine", "ejs");
const io = require("socket.io")(server, {
    cors: {
        origin: '*'
    }
});

app.get('/', (req, res) => {
    console.log("hello world")
    res.send("hello world")
});


io.on('connection', (socket) => {

    console.log('a user connected');

    socket.on("info", (id, callback) => {
        console.log("id::", id);
        // { name: "updated" }
        socket.on('disconnect', () => {
            console.log('user disconnected');

            userController.updateStatus(id, 'Off-Line')



        });





    });

    socket.on('my message', (msg) => {
        console.log('message: ' + msg);
        socket.emit('my broadcast', `server: ${msg}`);
    });
});
server.listen(process.env.PORT || 8000, () => {
    console.log("Server up!");
});




