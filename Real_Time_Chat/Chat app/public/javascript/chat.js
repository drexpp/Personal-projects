let Chat = function(socket) {
  this.socket = socket;
};

Chat.prototype.sendMessage = function(room, text) {
  let message = {
    room: room,
    text: text
  };

  this.socket.emit('message', message);
};

Chat.prototype.changeRoom = function(room) {
  this.socket.emit('join', {
    newRoom: room
  });
};

Chat.prototype.processCommand = function(command) {

  let words = command.split(' ')
    // Parse command from first word
    , commands = words[0].substring(1, words[0].length).toLowerCase()
    , message = false;

  switch(commands) {
    // Handle room changing/creation
    case 'join':
      words.shift();
      let room = words.join(' ');
      this.changeRoom(room);
      break;

    // Handle name change attempts
    case 'nick':
      words.shift();
      let name = words.join(' ');
      this.socket.emit('nameAttempt', name);
      break;

    // Return an error message if the command isn't recognized
    default:
      message = 'Unrecognized command.';
      break;
  }

  return message;
};


