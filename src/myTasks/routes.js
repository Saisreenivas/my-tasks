const express = require("express");
const MyTasksController = require("./controller");
const asyncWrapper = require("../utils/asyncWrapper");

const MyTasksRoutes = () => {

  const router = express.Router();

  router.post('/create-task', asyncWrapper(MyTasksController.createTask))
  router.put('/update-task/:id', asyncWrapper(MyTasksController.updateTask))
  router.get('/get-all-tasks', asyncWrapper(MyTasksController.getAllTasks))
  router.get('/get-tasks-summary', asyncWrapper(MyTasksController.getTasksSummary))
  router.get('/get-monthly-tasks-summary', asyncWrapper(MyTasksController.getMonthlyTasksSummary))

  return router;
}

module.exports = MyTasksRoutes;