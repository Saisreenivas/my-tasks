const express = require('express');
const MyTasksRoutes = require('./myTasks/routes');
const app = express();
const { SERVER_CONFIG } = require('./config');
const { ErrorHandlerMw } = require('./middleware');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/health', (_, res) => res.sendStatus(200));
app.use('/my-tasks', MyTasksRoutes());
app.use(ErrorHandlerMw);


app.listen(SERVER_CONFIG.PORT, SERVER_CONFIG.HOST, () => console.log(`started server on: ${SERVER_CONFIG.HOST}:${SERVER_CONFIG.PORT}`));