
const db = require('../db');
const _ = require('lodash');
const MyTasksDao = require('./dao');
const MyTasksValidations = require('./validations');
const { TASK_STATUS } = require('../config/myTaskConfig');
const moment = require('moment');


const createTask = async (title, description) => {
  const status = TASK_STATUS.OPEN;
  MyTasksValidations.createTask(title, description);
  const data = await MyTasksDao.createTask(db, { title, description, status });
  return data;
}

const updateTask = async (id, title, description, status) => {
  MyTasksValidations.updateTask(id, title, description, status);
  const data = await MyTasksDao.updateTask(db, { id, title, description, status });
  return data;
}

const getAllTasks = async (limit, offset) => {
  MyTasksValidations.getAllTasks(limit, offset);
  const data = await MyTasksDao.getAllTasks(db, limit, offset);
  return data;
}

const getMonthlyTasksSummary = async () => {
  const data = await MyTasksDao.getMonthlyTasksSummary(db);
  const monthlyAgg = _.groupBy(data, 'date');
  const result = {};
  for (let key in monthlyAgg) {
    const summary = {
      date: moment(key).format('MMMM YYYY'),
      metrics: {
        [TASK_STATUS.OPEN]: 0,
        [TASK_STATUS.IN_PROGRESS]: 0,
        [TASK_STATUS.DONE]: 0
      }
    };
    for (let i = 0; i < monthlyAgg[key].length; i++) {
      summary.metrics[data[i].status] = data[i].count;
    }
    result[key] = summary;
  }
  return Object.values(result);
}


const getTasksSummary = async () => {
  const data = await MyTasksDao.getTasksSummary(db);
  const summary = {
    [TASK_STATUS.OPEN]: 0,
    [TASK_STATUS.IN_PROGRESS]: 0,
    [TASK_STATUS.DONE]: 0
  };
  for (let i = 0; i < data.length; i++) {
    summary[data[i].status] = data[i].count;
  }
  return summary;
}


module.exports = { createTask, updateTask, getAllTasks, getMonthlyTasksSummary, getTasksSummary };