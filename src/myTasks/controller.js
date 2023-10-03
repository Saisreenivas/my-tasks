const express = require('express');
const MyTasksService = require('./service');

async function createTask(req, res) {
  const { title, description } = req.body;
  const result = await MyTasksService.createTask(title, description);
  return res.json(result);
}

async function updateTask(req, res) {
  const id = req.params.id;
  const { title, description, status } = req.body;
  const result = await MyTasksService.updateTask(id, title, description, status);
  return res.json(result);
}


/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function getAllTasks(req, res) {
  const { limit, offset } = req.query;

  const result = await MyTasksService.getAllTasks(limit, offset);

  return res.json({ data: result });
}


async function getTasksSummary(req, res) {
  const result = await MyTasksService.getTasksSummary();
  return res.json({ data: result });
}

async function getMonthlyTasksSummary(req, res) {
  const result = await MyTasksService.getMonthlyTasksSummary();
  return res.json({ data: result });
}



module.exports = { getAllTasks, createTask, updateTask, getTasksSummary, getMonthlyTasksSummary };