import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import logger from './src/utils/logger.js';
import usersRouter from './src/routers/usersRouter.js';
import groupRouter from './src/routers/groupRouter.js';
import eventRouter from './src/routers/eventRouter.js';
import postRouter from './src/routers/postRouter.js';
import messageRouter from './src/routers/messageRouter.js';
import photoRouter from './src/routers/photoRouter.js';
import friendRouter from './src/routers/friendRouter.js';
import eventAttendeesRouter from './src/routers/eventAttendRouter.js';
import commentRouter from './src/routers/commentRouter.js';



dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/api', usersRouter);
app.use('/api',groupRouter);
app.use('/api',eventRouter);
app.use('/api',postRouter);
app.use('/api',messageRouter);
app.use('/api',commentRouter);
app.use('/api',photoRouter);
app.use('/api',friendRouter);
app.use('api',eventAttendeesRouter);

app.listen(port, () => {
    logger.info(`server running on port http://localhost:${port}`);
})