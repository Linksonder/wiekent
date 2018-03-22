

 
function SocketManager(){
    var self = this;

    self.io =  null;
    self.sockets = [];

    //The constructor of the socketmanager.
    //listen to connections
    self.connect = function(io){
        this.io = io;
        io.on('connection', function(socket){
            self.sockets.push(socket);
        })
    };

    //Emit to alle listening sockets
    self.emitAll =  function(name, data){
        this.io.emit(name, data);
    }

}

var sm = new SocketManager();
module.exports = sm;



// module.exports = function(newIo){

//     if(newIo){
//         io = newIo;
//         connections = [];
//         var connections = [];
//         io.on('connection', function(socket){
//             connections.push(socket);

//             socket.on('drag', function(event){
//                 io.emit('drag-update', event);
//             })
//         });    

        
//     }
//     else{
//         return {
//             io: io,
//             send: function(msg, data){
//                 if(this.io)
//                     io.emit(msg, data);
//             },
//             connections: connections
//         };
//     }
// };


