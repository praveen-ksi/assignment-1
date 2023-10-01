# Task manager api


## 1.Retrieve all the tasks
<code>curl --location 'http://localhost:3000/tasks?isCompleted=false&completionDate=latest'</code>

queryParams:
1) <code>isCompleted</code> : it filters the task based on it's completion status which can be <code>true</code> or <code>false</code>
2) <code>completionDate</code> : it sorts the task based on completion date it can have only one of the following value <code>latest</code> or <code>oldest</code>. Note the task without any completion date is considered as latest


## 2.Retrive a task by it's id
<code>curl --location 'http://localhost:3000/tasks/2'</code>


## 3.Retrive a task by it's priority level
<code>curl --location 'http://localhost:3000/tasks/priority/high'</code>

Here <code>high</code> is a path parameter and which can be <code>low</code> or <code>medium</code>

## 4.Create a new task
<code>curl --location 'http://localhost:3000/tasks' \
--header 'Content-Type: application/json' \
--data '{
    "id": 4,
    "title": "Wash clothes",
    "description": "Wash dirty clothes",
    "isCompleted": true,
    "priority": "high",
    "completionDate": "24 Aug 2023"
}'</code>

## 5.Update an existing task by its ID
<code>curl --location --request PUT 'http://localhost:3000/tasks/1' \
--header 'Content-Type: application/json' \
--data '{
    "completionDate": "22 Aug 2023"
}'
</code>

## 6.Delete a task by its ID.
<code>'curl --location --request DELETE 'http://localhost:3000/tasks/3'</code>




