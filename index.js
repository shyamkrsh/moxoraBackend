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




const userChangeStream = User.watch();
userChangeStream.on("change", async (change) => {
    console.log("User Change detected:", change);
    if (change.operationType === 'update') {
        io.emit("userUpdate", {
            type: "update",
            updatedFields: change.updateDescription.updatedFields,
            userId: change.documentKey._id
        })
    }else if (change.operationType === "delete") {
        io.emit("postUpdate", { type: "delete", userId: change.documentKey._id });
    }
    io.emit("userUpdate", {});
})

const postChangeStream = Post.watch();
postChangeStream.on("change", async (change) => {
    console.log("Post Change detected:", change);
    if (change.operationType === "insert") {
        io.emit("postUpdate", { type: "insert", newPost: change.fullDocument });
    } else if (change.operationType === "update") {
        io.emit("postUpdate", {
            type: "update",
            updatedFields: change.updateDescription.updatedFields,
            postId: change.documentKey._id
        });
    } else if (change.operationType === "delete") {
        io.emit("postUpdate", { type: "delete", postId: change.documentKey._id });
    }
});


app.listen(PORT, () => {
    console.log(`Server is listening to the port : ${PORT}`)
})