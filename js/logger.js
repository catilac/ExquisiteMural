var Logger = {
	months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	
	pad: function(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	},

	timestamp: function() {
	  var d = new Date();
	  return [
	    d.getDate(),
	    this.months[d.getMonth()],
	    [ this.pad(d.getHours())
	    , this.pad(d.getMinutes())
	    , this.pad(d.getSeconds())
	    , (d.getTime() + "").substr( - 4, 4)
	    ].join(':')
	  ].join(' ');
	},

	scrollToBottom: function() {
	  window.scrollBy(0, document.body.scrollHeight - document.body.scrollTop);
	},

	log: function(data) {
		if(!this.output_log) {
			this.output_log = document.getElementById('log')
		}
	  // this.output_log.innerHTML += this.timestamp()+": "+data+"<br />";
	  // this.scrollToBottom();
	}
}
