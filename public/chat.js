// user data
// set a unique attribute like username for addressing the user
var userdata = {
    username: "",
    firstname: "",
    lastname: ""
};

// online users list
var onlinelist = [];

// make connection
var socket = io.connect('http://localhost:4000');

var msg = $("#message-text").val();
var selectedUser = "Andy Kim";

// ================================================================
// emit events
// ================================================================
// demo functoins make a user online after entering username to chat
// use the unique ID you set above on initialization without using this function
$("#connect-button").click(function () {
    userdata.username = $('#username-input').val();
    if (userdata.username.length > 0) {
        socket.emit('u_online', userdata);
    }
});

// sends the chat message to server if it's not empty
// parsing message object had senders and recipients username along with the message
$("#send").click(function () {
    var msg = {
        sender: $('#username-input').val(),
        message: $('#message-text').val(),
        recipient: selectedUser
    };

    // sending message if it's not empty
    if (msg.message.length > 0) {
        socket.emit('u_chat', msg);
    }
});

// sends the typing status
// parsing message object had username of the person typing
$('#message-text').on('keypress', function () {
    var msg = {
        sender: $('#username-input').val(),
        recipient: selectedUser
    };
    socket.emit('u_typing', msg);
});

// ================================================================
// listen events
// ================================================================
// updating online users list
// receives a message everytime a user joins with the chat
// updates the online list of userside
socket.on('su_online', function (data) {
    var msgObj = JSON.parse(JSON.stringify(data));
    msgObj.messages = [];

    if (onlinelist.length == 0) {
        // adds first user without checking
        onlinelist.push(msgObj);
    } else {
        // checks if the joined user exists by username
        var available = false;
        for (let i = 0; i < onlinelist.length; i++) {
            if (onlinelist[i].username == msgObj.username) {
                available = true;
                break;
            }
        }

        // adds user if it's a new user
        if (!available) {
            onlinelist.push(msgObj);
        }
    }

    // updating view with new user list
    updateOnlineListView();
});

// updating for new messages
// checks the sender and receiver of message and updates the chat
socket.on('su_msg', function (data) {
    // traversing online list to find sender
    onlinelist.forEach(user => {
        if (user.username == data.sender) {
            // updating senders chat
            user.messages.push(data);
            updateMessagesView();
        }
    });
});

// updating typing status
// data is the username of the person typing
socket.on('su_typing', function (data) {
    // traversing online list to find sender
    onlinelist.forEach(user => {
        if (user.username == data) {
            // updating recipient-side
            setTimeout(() => {
                feedback.innerHTML = "";
            }, 500);
            feedback.innerHTML = '<p>' + data + ' is typing...</p>';
        }
    });
});

// ================================================================
// other
// these functions probably won't be needed for your application
// ================================================================
// function to connect user upon hitting enter on username input
$("#username-input").on("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        $("#connect-button").click();
    }
});

// function to send message upon hitting enter on chat input
$("#message-text").on("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        $("#send").click();
        $('#message-text').val("");
    }
});

// funstion to update online list on UI
function updateOnlineListView() {
    $('#online-list').html("");
    onlinelist.forEach(el => {
        $('#online-list').html($('#online-list').html() + "<button onclick=\"changeSelected('" + el.username + "')\" class=\"list-group-item list-group-item-action\">" + el.username + "</button>");
    });
}

// function to select a user to chat with UI
function changeSelected(uid) {
    selectedUser = uid;
    updateMessagesView();
}

// function to update UI with new messages
function updateMessagesView() {
    $('#output').html("");
    onlinelist.forEach(user => {
        if (selectedUser == user.username) {
            user.messages.forEach(msg => {
                $('#output').html($('#output').html() + "<p><strong>" + msg.sender + "</strong>: " + msg.message + "</p>");
            });
        }
    });
}