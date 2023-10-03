const { MY_TASK_CONFIG } = require("../config");
const CustomError = require("../utils/CustomError");

const createTask = (title, description) => {
  if (!title || !description) throw new CustomError('Title and description are required');
  if (title.length > 50) throw new CustomError('Title must be less than 50 characters');
}

const updateTask = (id, title, description, status) => {
  if (!id) throw new CustomError('Id, title, description and status are required');
  if(!title && !description && !status) throw new CustomError('At least one of title, description or status is required');
  if (title && title.length > 50) throw new CustomError('Title must be less than 50 characters');
  if (status && !Object.values(MY_TASK_CONFIG.TASK_STATUS).includes(status)) throw new CustomError('Status must be open, in_progress or done');
}

const getAllTasks = (limit, offset) => {
  if (Number.isNaN(limit) || Number.isNaN(offset)) throw new CustomError('Limit and offset must be numbers');
}

module.exports = { createTask, updateTask, getAllTasks };