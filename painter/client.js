var host = "localhost:8000"

var conn;

// Msg Types!!!!!!!!!!!!
// strokeStart
// strokeMove
// strokeEnd

function createBrush(player, brushType) { 
	player.brush = eval("new " + brushType + "(player.context)")
}

function handleMessage(player, data) {
	player.update(data.xPos, data.yPos, data.brushType);
	
	if (data.msgType == "strokeStart") {
		player.brush.strokeStart( player.mouseX, player.mouseY );
	} else if (data.msgType == "strokeMove") {
		player.brush.stroke( player.mouseX, player.mouseY );
		// do the move stuff
	} else if (data.msgType == "strokeEnd") {
		player.brush.strokeEnd();
		// end the stroke
	}
}

var connect = function() {
  if (window["WebSocket"]) {
    conn = new WebSocket("ws://" + host + "/test");
    conn.onmessage = function(evt) {
			data = JSON.parse(evt.data);
			the_player = players[data.id]
			if (!the_player) {
				players[data.id] = new player(context);
			} else {
				handleMessage(the_player, data);
			}
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