import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieSession from "cookie-session";
import { currentUser, requireAuth, errorHandler, NotFoundError } from "../common";
import {
    newPostRouter,
    updatePostRouter,
    deletePostRouter,
    showPostRouter,
    addImagesRouter,
    deleteImagesRouter,

    newCommentRouter,
    deleteCommentRouter,

    currentUserRouter,
    signupRouter,
    signinRouter,
    signoutRouter

} from './routers';

dotenv.config();

const app = express();

app.set('trust proxy', true);

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}));

app.use(express.urlencoded({
    extended: false
}));

app.use(express.json());

app.use(cookieSession({
    signed: false,
    secure: false
}))

app.use(currentUser);

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.use(requireAuth, newPostRouter);
app.use(requireAuth, updatePostRouter);
app.use(requireAuth, deletePostRouter);
app.use(showPostRouter);
app.use(requireAuth, addImagesRouter);
app.use(requireAuth, deleteImagesRouter);

app.use(requireAuth, newCommentRouter);
app.use(requireAuth, deleteCommentRouter);

app.all('*', (req, res, next) => {
    next(new NotFoundError());
});


app.use(errorHandler);


export { app };