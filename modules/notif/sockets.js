const socketIO = require('socket.io')
const server = require(__base + 'system/server.js')
const mongoose = require('mongoose')
const notify = require(__base + 'models/notify.js')

const io = socketIO(server);

io.on('connection', (socket) => {
  /* general notification */
  socket.on('notification', (sender,activity,receiver) => {
    var notification = new notify({
        sender: sender,
        receiver: receiver,
        action: activity,
        seen: false
    });
    notification.save((error) => {if (error) {console.log(error)}})
  });
});

const fireNotification = (sender, receiver, activity) => {
  io.emit('notification', sender, activity, receiver)
}

module.exports = fireNotification
