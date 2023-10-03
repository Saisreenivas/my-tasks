const createTask = async (db, { title, status, description }) => {
  const created_at = new Date();
  const data = await db.oneOrNone(`insert into my_tasks (title, description, status, created_at) values ($1, $2, $3, $4) returning *`, [title, description, status, created_at]);
  return data;
}

const updateTask = async (db, { id, title, description, status }) => {
  const data = await db.oneOrNone(`
  update 
    my_tasks 
  set 
    title = 
      case when $1 is not null then $1 
      else title 
      end, 
    description = 
      case when $2 is not null then $2 
      else description 
      end, 
    status = 
      case when $3 is not null then $3
      else status
      end
  where id = $4
  returning *`, [title, description, status, id]);
  return data;
}

const getAllTasks = async (db, limit = 10, offset = 0) => {
  const data = await db.query(`select * from my_tasks order by id asc limit $1 offset $2`, [limit, offset]);
  return data;
}

const getMonthlyTasksSummary = async (db) => {
  const data = await db.query(`select date(created_at) as date, status, count(*)::int as count from my_tasks group by 1,2`);
  return data;
}

const getTasksSummary = async (db) => {
  const data = await db.query(`select status, count(*)::int as count from my_tasks group by status`);
  return data;
}


module.exports = { createTask, updateTask, getAllTasks, getMonthlyTasksSummary, getTasksSummary };