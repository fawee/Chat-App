var App = (function() {
    var that = {},
        socket = io(),
        messages = document.getElementById("messages");

    function init() {
        var btn_send = document.getElementById("btn_send"),
            msg = document.getElementById("msg");

        btn_send.addEventListener("click", function() {
            socket.emit("msg", msg.value);
        });
        console.log("init Client");
        initEventListener();
    }

    function initEventListener() {
        socket.on("msg", function(msg) {
            var msgElement = document.createElement("li");
            msgElement.className = "well";
            msgElement.innerHTML = msg;
            messages.appendChild(msgElement);
        });
    }

    that.init = init;
    return that;
}());
