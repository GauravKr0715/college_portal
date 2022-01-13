const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
require('dotenv').config();
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');

const logger = require('./helpers/logger');

// local imports
const routes = require('./routes');

mongoose.connect(process.env.DB_KEY, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  logger.info(`database status: ${mongoose.connection.readyState}`);
  logger.info("Connected to DB");
});

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
// console.log(__dirname);
app.use('/assignments', express.static(__dirname + '/assignments'));
app.use('/assignment_submissions', express.static(__dirname + '/assignment_submissions'));
app.use('/notes', express.static(__dirname + '/notes'));
app.use('/tests', express.static(__dirname + '/tests'));
app.use('/test_submissions', express.static(__dirname + '/test_submissions'));
app.use('/static', express.static(__dirname + '/static'));

// feeding local middlewares
app.use('/api/v1', routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.get('/', (req, res) => {
  res.status(200).send('hello')
});

let users = [];

const addUser = (user_id, socket_id) => {
  !users.some(user => user.user_id === user_id) && users.push({
    user_id,
    socket_id
  })
};

const removeUser = socket_id => {
  users = users.filter(user => user.socket_id !== socket_id);
};

const getUser = (user_id) => {
  return users.find(user => user.user_id === user_id);
}

//Whenever someone connects this gets executed
io.on('connection', function (socket) {
  console.log('-----------------------------------A user connected');

  // take user id and socket id from user
  socket.on("addUser", user_id => {
    addUser(user_id, socket.id);
    console.log(users)
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ sender_id, receiver_id, text }) => {
    console.log(receiver_id);
    console.log(sender_id);
    console.log(text);
    const user = getUser(receiver_id);
    console.log(user)
    io.to(user?.socket_id).emit("getMessage", {
      sender_id, text
    })
  });

  socket.on("disconnect", () => {
    console.log("-------------------------------A user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
  logger.info(`Server running at PORT: ${PORT}`)
})