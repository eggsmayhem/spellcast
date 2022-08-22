const io = require('socket.io')(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
})

let users = []

// function to determine if user already has a socket
const addUser = (userId, socketId) => {
    !users.some(user=>user.userId === userId) &&
        users.push({ userId, socketId})
}
// const addUser = (userId, socketId) => {
//     if (!users.some(user=>user.userId === userId)) {
//         users.push({ userId, socketId})
//     }    
// }

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

const getUser = (userId) => {
    return users.find(user=> user.userId === userId)
}
io.on("connection", (socket) => {
    console.log("a user connected to socket")
    //get userId and socketId from user in Messenger Effect
    socket.on("addUser", userId => {
        addUser(userId, socket.id)
        //send from server to client
        io.emit("getUsers", users)
    })

    //send and get messages
    socket.on("sendMessage", ({senderId, receiverId, text}) => {
        const user = getUser(receiverId)
        io.to(user.socketId).emit("getMessage", {
            senderId, 
            text
        })
    })

    socket.on("disconnect", () => {
        console.log("A user disconnected")
        removeUser(socket.id)
        io.emit("getUsers", users)
    })
})