import express from 'express';
const app = express();
const PORT = process.env.PORT || 8080;
import connectToDB from "./db.js";
import bodyParser from 'body-parser';
import userRouter from './routes/userRouter.js'
import postRouter from './routes/postRouter.js'

connectToDB();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);





app.listen(PORT, () => {
    console.log(`Server is listening to the port : ${PORT}`)
})