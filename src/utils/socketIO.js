const {Server} = require("socket.io");

const connectChat = () => {
  try {
    const io = new Server({
      cors: {
        origin: ["http://localhost:3000"]
      }
    });

    io.on("connection", (socket) => {
      socket.emit("welcome", "Welcome to chat");
      console.log("socket", socket.id);

      socket.on("message", ({message, to}) => {
        console.log(message, to);
        
        io.to(to).emit("receive_msg", message);
      });

      socket.on("join_group", (group) => {
        socket.join(group);
      })

    });

    io.listen(process.env.CHAT_PORT);
  } catch (error) {
    console.log("Chat io error: ", error);
  }
}

module.exports = connectChat