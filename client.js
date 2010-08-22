var host = "localhost:8000" // "localhost:8000"

var conn;
var connect = function() {
  if (window["WebSocket"]) {
    conn = new WebSocket("ws://" + host + "/test");
    conn.onmessage = function(evt) {
      Logger.log(evt.data);
    };
    
    conn.onclose = function() {
      Logger.log("closed");
    };

    conn.onopen = function() {
      Logger.log("opened");
    };
  }
};


$(document).ready(function() {
	// on mouse move send out position information.
	$('#mural').mousemove(function(e) {
	  if (conn) {
			conn.send("From: " + e.pageX + ", " + e.pageY);
	  }
	});
	
	connect();
})