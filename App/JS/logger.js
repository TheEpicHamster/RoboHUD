const { StringDecoder } = require('string_decoder');
const net = require('net');
const port = 5002;
const decoder = new StringDecoder('utf-8');

function time(){
  this.today = null;
  this.date = null;
  this.time = null;

  this.now = function(){
    this.today = new Date();
    this.date = `${this.today.getFullYear()}-\
${(this.today.getMonth()+1)}-${this.today.getDate()}`;
    this.time = `${this.today.getHours()}:\
${this.today.getMinutes()}:${this.today.getSeconds()}`;
    return this.date+'|'+this.time;
  }
}

var server = net.createServer(function(socket) {
  socket.on('data', function(data) {
    str = decoder.write(data);
    current = new time();
    if (str.substr(str.length-1) == '\n') {
      console.log(`[${current.now()}] ${str.substr(0,str.length-1)}`);
    } else {
      console.log(`[${current.now()}] ${str}`);
    }    
  })
})

server.listen(port, function() {
  console.log(`Server listening on port ${port}`)
})
