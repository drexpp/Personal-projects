const chatServer = require('./lib/chat_server');
const express = require('express');
const port = process.env.PORT || 8080;

let app = express();
const http = require('http').Server(app);

app.use(express.static('./public'));

//Start http server
http.listen(port, () => console.log(`http listening on port: ${port}`));

//Socket-IO server in same TCP/IP port as our HTTP server
chatServer.listen(http);


