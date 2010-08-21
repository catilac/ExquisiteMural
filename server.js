var http = require('http');
var fs = require('fs');
var path = require('path');
var sys  = require('sys');
var ws   = require('./lib/ws');

/*-----------------------------------------------
  logging:
-----------------------------------------------*/
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

function timestamp() {
  var d = new Date();
  return [
    d.getDate(),
    months[d.getMonth()],
    [ pad(d.getHours())
    , pad(d.getMinutes())
    , pad(d.getSeconds())
    , (d.getTime() + "").substr( - 4, 4)
    ].join(':')
  ].join(' ');
};

function log(msg) {
  sys.puts(timestamp() + ' - ' + msg.toString());
};

function serveFile(req, res){
	
	if(req.url.match(/\.js/)){
		log("HTTP: inbound request, serving: " + req.url);
		res.writeHead(200, {'Content-Type': 'text/javascript'});
		fs.createReadStream( path.normalize(path.join(__dirname, req.url)), {
      'flags': 'r',
      'encoding': 'binary',
      'mode': 0666,
      'bufferSize': 4 * 1024
    }).addListener("data", function(chunk) {
			res.write(chunk, 'binary');
		}).addListener("close", function() {
			res.end();
		});
	} else if( req.url.indexOf("favicon") > -1 ){
    log("HTTP: inbound request, served nothing, (favicon)");
    
    res.writeHead(200, {'Content-Type': 'image/x-icon'});
    res.end("");
  } else {
    log("HTTP: inbound request, served client.html");

    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream( path.normalize(path.join(__dirname, "index.html")), {
      'flags': 'r',
      'encoding': 'binary',
      'mode': 0666,
      'bufferSize': 4 * 1024
    }).addListener("data", function(chunk){
      res.write(chunk, 'binary');
    }).addListener("close",function() {
      res.end();
    });
  }

};

var httpServer = http.createServer(serveFile);

var server = ws.createServer({ debug: true }, httpServer);

server.addListener("listening", function() {
	log("Listening for connections.");
})

server.addListener("connection", function(conn){
  log("opened connection: "+conn.id);
  
  server.send(conn.id, "Connected as: "+conn.id);
  conn.broadcast("<"+conn.id+"> connected");
  
  conn.addListener("message", function(message){
    log("<"+conn.id+"> "+message);
    conn.broadcast("<"+conn.id+"> "+message);
  });
});

server.addListener("close", function(conn){
  log("closed connection: "+conn.id);
  conn.broadcast("<"+conn.id+"> disconnected");
});

server.listen(8000);
