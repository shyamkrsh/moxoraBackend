import express from 'express';
const app = express();
const PORT = process.env.PORT || 8080;
import connectToDB from "./db.js";
import bodyParser from 'body-parser';
import http from 'http'
import { Server } from 'socket.io';
import userRouter from './routes/userRouter.js'
import postRouter from './routes/postRouter.js'
import Post from './models/Post.js';
import User from './models/User.js';

connectToDB();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

// Create HTTP server for Express and Socket.io
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    },
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// User Change Stream
// const userChangeStream = User.watch([], { fullDocument: "updateLookup" });
// userChangeStream.on("change", async (change) => {
//     console.log("User Change detected:", change);
//     let updateData;
//     if (change.operationType === "insert") {
//         updateData = { type: "insert", newUser: change.fullDocument };
//     } else if (change.operationType === "update") {
//         updateData = {
//             type: "update",
//             updatedFields: change.updateDescription.updatedFields,
//             userId: change.documentKey._id
//         };
//     } else if (change.operationType === "delete") {
//         updateData = { type: "delete", userId: change.documentKey._id };
//     }
//     console.log("Emitting update:", updateData);
//     io.emit("userUpdate", updateData);
// });

// Post Change Stream
// const postChangeStream = Post.watch([], { fullDocument: "updateLookup" });
// postChangeStream.on("change", async (change) => {
//     console.log("Post Change detected:", change);
//     let updateData;
//     if (change.operationType === "insert") {
//         updateData = { type: "insert", newPost: change.fullDocument };
//     } else if (change.operationType === "update") {
//         updateData = {
//             type: "update",
//             updatedFields: change.updateDescription.updatedFields,
//             postId: change.documentKey._id
//         };
//     } else if (change.operationType === "delete") {
//         updateData = { type: "delete", postId: change.documentKey._id };
//     }
//     console.log("Emitting update:", updateData);
//     io.emit("postUpdate", updateData);
// });

server.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
