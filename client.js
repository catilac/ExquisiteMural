var host = "10.0.1.4:8000" // "localhost:8000"

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


// document.getElementById("send").addEventListener("click", function(e) {
//   if (conn) {
//     setTimeout(function() {
//       conn.send("test message");
//     }, 0);
//   }
//   e.preventDefault();
//   return false;
// }, false);

// window.onload = connect;

$(document).ready(function() {
	// on mouse move send out position information.
	$('#square').mousemove(function(e) {
	  if (conn) {
			conn.send("From: " + e.pageX + ", " + e.pageY);
	  }
	});
	
	connect();
})