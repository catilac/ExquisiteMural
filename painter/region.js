function region(context, x_pos, y_pos, width, height) {
	this.init(context, x_pos, y_pos, width, height);
}

region.prototype = {
	context: null,
	xPos: null,
	yPos: null,
	width: null,
	height: null,

	init: function(context, x_pos, y_pos, width, height) {
		this.context = context;
		this.xPos = x_pos;
		this.yPos = y_pos;
		this.width = width;
		this.height = height;
	},

	draw: function () {
		if (context) {
			context.strokeRect(this.xPos, this.yPos, this.width, this.height);
		}
 	}
}

