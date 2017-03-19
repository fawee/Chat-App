var App = (function() {
    var that = {},
        socket,
        messages = document.getElementById("messages"),
        nickname = document.getElementById("nickname");

    function init() {
        var btn_send = document.getElementById("btn_send"),
        	btn_nickname = document.getElementById("btn_nickname"),
            msg = document.getElementById("msg"),
            modal = document.getElementById("modal");

        $('#modal').modal('show');

        btn_nickname.addEventListener("click", function() {
        	$('#modal').modal('hide');
        	socket = io();
        	initEventListener();
        	socket.emit("new_user", nickname.value);
        });

        btn_send.addEventListener("click", function() {
            socket.emit("msg", msg.value);
        });
        console.log("init Client");
    }

    function initEventListener() {

    	socket.on("connect", function() {
    		socket.id = nickname.value;
    	});

        socket.on("msg", function(data) {
            var msgElement = document.createElement("li");
            msgElement.className = "well";
            msgElement.innerHTML = data.username + ": " + data.msg;
            messages.appendChild(msgElement);
        });

        socket.on("connected", function(user) {
            var msgElement = document.createElement("li");
            msgElement.className = "well connected";
            msgElement.innerHTML = user + " joined the chat room";
            messages.appendChild(msgElement);
        });

        socket.on("disconnected", function(user) {
            var msgElement = document.createElement("li");
            msgElement.className = "well disconnected";
            msgElement.innerHTML = user + " has left the chat room";
            messages.appendChild(msgElement);
        });
    }

    that.init = init;
    return that;
}());
