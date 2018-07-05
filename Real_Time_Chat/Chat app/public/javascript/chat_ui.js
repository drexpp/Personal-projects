//Escaped content with Jquery .text() because it is INSECURE from client
function divEscapedContentElement(message) {
  return $('<div></div>').text(message);
}
//System chat message (SECURE)
function divSystemContentElement(message) {
  return $('<div></div>').html('<i>' + message + '</i>');
}

//If user writes a message with / infront it will be treated as command
//otherwise it will be sended to a prototype function of chatApp
//(Class Chat)
function processUserInput(chatApp, socket) {
  var message = $('#send-message').val()
    , systemMessage;

  // If user input begins with a slash, treat it as a command
  if (message[0] == '/') {
    systemMessage = chatApp.processCommand(message);
    if (systemMessage) {
      $('#messages').append(divSystemContentElement(systemMessage));
    }

  // Broadcast non-command input to other users
  } else {
    chatApp.sendMessage($('#room').text(), message);
    $('#messages').append(divEscapedContentElement(message));
	//Scrolling chat screen to bototm when new message is appended
    $('#messages').scrollTop($('#messages').prop('scrollHeight'));
  }

  $('#send-message').val('');
}

var socket = io.connect();

$(document).ready(function() {
  var chatApp = new Chat(socket);

  // Display the results of a name change attempt
  socket.on('nameResult', function(result) {
    var message;

    if (result.success) 
      message = 'You are now known as ' + result.name + '.';
    else
      message = result.message;

    $('#messages').append(divSystemContentElement(message));
  });

  // Display the results of a room change
  socket.on('joinResult', function(result) {
    $('#room').text(result.room);
    $('#messages').append(divSystemContentElement('Room changed.'));
  });

  // Display received messages
  socket.on('message', function (message) {
    var newElement = $('<div></div>').text(message.text);
    $('#messages').append(newElement);
  	$('#messages').scrollTop($('#messages').prop('scrollHeight'));
  });

  // Display list of rooms available
  socket.on('rooms', function(rooms) {
    $('#room-list').empty();

	 rooms.map(room => {
	  	 room = room.substring(0, room.length);
     	 if (room != '') 
       	 	$('#room-list').append(divEscapedContentElement(room));
	 });
 
    // Allow the click of a room name to change to that room
    $('#room-list div').click(function() {
      chatApp.processCommand('/join ' + $(this).text());
      $('#send-message').focus();
    });
  });

  // Request list of rooms available intermittantly
  setInterval(function() {
    socket.emit('rooms');
  }, 1000);



  // Allow clicking the send button to send a chat message
  $('#send-form').submit(function() {
    processUserInput(chatApp, socket);
    return false;
  });
});


