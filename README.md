
# Setup

## Prerequisites
- Docker
- Node

## Database Setup
```bash
COMPOSE_PROJECT_NAME=my_tasks_app docker-compose -f setup/docker-compose.yml up -d

PGPASSWORD="tVk2YXcc2a6cttqZq2cKGcJQN" psql -h localhost -p 5432 -U postgres -f setup/init.sql
```

# Start Server

## Development
```bash
npm run dev
```

## Production
```bash
npm run start
```


# cURL for testing

## Health Check
```bash
curl --location '127.0.0.1:3000/health'
```

## Add Sample Data
```bash
curl --location '127.0.0.1:3000/my-tasks/create-task' \
--header 'Content-Type: application/json' \
--data '{
    "title":"Complete Homework",
    "description":"Complete English and hindi homework"
}'
```

## Update Data
```bash
curl --location --request PUT '127.0.0.1:3000/my-tasks/update-task/1' \
--header 'Content-Type: application/json' \
--data '{
    "description": "Complete English, Sanskrit, and hindi homework"
}'
```

## Get All Tasks Paginated
```bash
curl --location '127.0.0.1:3000/my-tasks/get-all-tasks?limit=10&offset=0'
```

## Get Tasks Summary
```bash
curl --location '127.0.0.1:3000/my-tasks/get-tasks-summary'
```

## Get Monthly Tasks Summary
```bash
curl --location '127.0.0.1:3000/my-tasks/get-monthly-tasks-summary'
```


## Stop Docker Compose
```
COMPOSE_PROJECT_NAME=my_tasks_app docker-compose -f setup/docker-compose.yml down
```