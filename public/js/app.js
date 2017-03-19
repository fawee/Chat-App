var App = (function() {
    var that = {},
        socket,
        messages = document.getElementById("messages"),
        nickname = document.getElementById("nickname"),
        onlineUsersList = document.getElementById("dropdown-users");

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
            addUserToOnlineUsers(nickname.value);
            socket.emit("new_user", nickname.value);
        });

        btn_send.addEventListener("click", function() {
            createMsgElement({ msg: msg.value, username: socket.id });
            socket.emit("msg", msg.value);
        });
        console.log("init Client");
    }

    function initEventListener() {

        socket.on("connect", function() {
            socket.id = nickname.value;
        });

        socket.on("online", function(users) {
            if (users.length != 0) {
                addUserToOnlineUsers(users);
            }
        });

        socket.on("msg", function(data) {
            createMsgElement({ msg: data.msg, username: data.username });
        });

        socket.on("connected", function(username) {
            addUserToOnlineUsers(username);
            createMsgElement({ username: username, connected: true });
        });

        socket.on("disconnected", function(user) {
            createMsgElement({ username: user, connected: false })
            removeUserFromOnlineUsers(user);
        });
    }

    function createMsgElement(options) {
        var msgElement = document.createElement("li");

        if (options.msg) {
            msgElement.className = "well";
            msgElement.innerHTML = options.username + ": " + options.msg;
        } else if (options.connected) {
            msgElement.className = "well connected";
            msgElement.innerHTML = options.username + " has joined the chat room";
        } else {
            msgElement.className = "well disconnected";
            msgElement.innerHTML = options.username + " has left the chat room";
        }

        messages.appendChild(msgElement);
    }

    function addUserToOnlineUsers(user) {

        if (Array.isArray(user)) {
            user.forEach((user) => {
                var userElement = document.createElement("li");
                var userLink = document.createElement("a");

                userElement.appendChild(userLink);
                userElement.id = user;
                userLink.href = "#";
                userLink.innerHTML = user;
                onlineUsersList.appendChild(userElement);
            });
        } else {
            var userElement = document.createElement("li"),
                userLink = document.createElement("a");

            userElement.appendChild(userLink);
            userElement.id = user;
            userLink.href = "#";
            userLink.innerHTML = user;
            onlineUsersList.appendChild(userElement);
        }
    }

    function removeUserFromOnlineUsers(user) {
    	console.log(user);
    	var userElement = document.getElementById("" + user);
    	userElement.parentNode.removeChild(userElement);
    }

    that.init = init;
    return that;
}());
