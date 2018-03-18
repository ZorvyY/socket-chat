//Module requires an io object to be passed in order to properly set up handlers

module.exports = function(io) {
    if (io === undefined) throw new Error(`IO object not given. See ${__dirname}/handlers.js for more details.`);

    let exports = {};
    exports.chatMessage = user => {
        var socket = user.socket;
        socket.on('chat message', msg => {
            var msgObj = `${user.name}: ${msg}`;
            // currently the object is just a string, but we can change it
            // to an actual object later. The client will then accept info
            // and render the constructed string on the client side.
            console.log(`Message: {${msgObj}}`); //debugging
            io.emit('chat message', msgObj);
        });
    };

    exports.infoUpdate = user => {
        var socket = user.socket;
        socket.on('update user info', strOb => {
            console.log("updateing user info!!!!!!!!");
            let ob = JSON.parse(strOb);
            user.name = ob.name;
            console.log (ob.name);
        });
    };
    
    return exports;

};
