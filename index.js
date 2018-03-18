/*
  <body>
    <ul id="messages"></ul>
    <form action="">
      <input id="m" autocomplete="off" /><button>Send</button>
    </form>
*/

function getNickname() {
    let username = prompt("Enter your nickname:");
    return username;
}


document.addEventListener("DOMContentLoaded", function () {
    function sendUserInfo(ob) {
        socket.emit('update user info', JSON.stringify(ob));
    }
    var socket = io();
    
    $('form').submit(function(){
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });
    
    socket.on('chat message', function(msg){
        $('#messages').append($(`<li>${msg}</li>`));
    });

    socket.on('update', info => {
        // TODO: Use vanilla javascript instead of jquery to
        // append the messages.
        $('#messages').append($(`<li class="info">${info}</li>`));
    });

    (function() {
        var username = getNickname();
        sendUserInfo({name: username});
    })();
});
