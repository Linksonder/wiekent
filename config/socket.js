

 
var connections = [];
console.log('test');
var io = null;

module.exports = function(newIo){

    if(newIo){
        io = newIo;
        connections = [];
        var connections = [];
        io.on('connection', function(socket){
            connections.push(socket);

            socket.on('drag', function(event){
                io.emit('drag-update', event);
            })
        });    

        
    }
    else{
        return {
            io: io,
            send: function(msg, data){
                if(this.io)
                    io.emit(msg, data);
            },
            connections: connections
        };
    }
};


