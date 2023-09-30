const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const TASK_LIST = require('./taskList');
const validateBody = require('./helpers/dataValidator');
const routes = require('express').Router();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

const PORT = 3000;

routes.get('/', (req, res)=>{
  res.status(200).send("Task manager api");
});

//Retrieve all tasks
routes.get('/tasks',(req,res)=>{
    const queryParams = req.query;
    if(Object.keys(queryParams)?.length){
        if(queryParams?.isComplete === 'true'){
            const completedData = TASK_LIST.find((obj)=>obj.isCompleted);
            if(completedData){
                return res.status(200).send(completedData);
            }
            else return res.status(404).send("No data found");
        }
        console.log(queryParams);
    }
    else {
        res.status(200).send(TASK_LIST)
    }
})

//Retrieve a single task by its ID.
routes.get('/tasks/:id',(req,res)=>{
    const taskId = req.params.id;
    const requiredItem = TASK_LIST.find((obj)=>obj.id === taskId);
    if(requiredItem){
        return res.status(200).send(requiredItem);
    }
    else return res.status(404).send("Task for the following id was not found");
})

//Create a new task
routes.post('/tasks',(req,res)=>{
    const body = req.body;
    const {isValid,err} = validateBody(body);
    if(isValid){
        TASK_LIST.push(body);
        res.status(200).send("New task created successfully");
    }
    else {
        res.status(400).send(err);
    }
})

//Update an existing task by its ID.
routes.put('/tasks/:id',(req,res)=>(
    res.status(200).send()
))

//Delete a task by its ID.
routes.delete('/tasks/:id',(req,res)=>(
    res.status(200).send()
))

// routes.use('/courses', courseInfo);

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running and App is listening on port " + PORT);
    else
        console.log("Error occurred, server can't start", error);
    }
);