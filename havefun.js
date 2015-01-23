var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var port = process.env.PORT || 3000;


var userCount = 0;

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  userCount += 1;
  socket.on("insert javascript", function(code) {
    io.emit("insert javascript", code);
    console.log(code);
  });
  socket.on("disconnect", function() {
    userCount -= 1;
  });
});

http.listen(port, function() {
  console.log("Have Fun server started on port 4000");
});
