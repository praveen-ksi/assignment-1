const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const TASK_LIST = require('./taskList');
const validateBody = require('./helpers/dataValidator');
const { CompletionDate, Priority } = require('./constants/task');
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
        const {isComplete , completionDate} = queryParams;
        let resultData = [];

            //Handling for isComplete
            if(!isComplete){
                resultData = TASK_LIST;
            }
            else if(isComplete === 'true'){
                resultData = TASK_LIST.filter((obj)=>obj.isCompleted);
            }
            else if(isComplete == 'false'){
                resultData = TASK_LIST.filter((obj)=>!obj.isCompleted);
            }
            else if(isComplete !== 'true' && isComplete !== 'false'){
                //Handles the case when isComplete is not passed in query params
                return res.status(400).send("Bad request");
            }

            if(!resultData?.length){
                return res.status(404).send("Not found");
            }

            //Completion date sorting handling by latest and oldest
            if(completionDate === CompletionDate.latest){
                // if completion date is null then today's date is assigned as completionDate
                resultData = resultData.sort((a,b)=> new Date(b?.completionDate ?? new Date()) - new Date(a?.completionDate ?? new Date()));
            }
            else if(completionDate === CompletionDate.oldest){
                resultData = resultData.sort((a,b)=> new Date(a?.completionDate ?? new Date()) - new Date(b?.completionDate ?? new Date()));
            }
            else if(completionDate && (completionDate !== CompletionDate.latest || completionDate !== CompletionDate.oldest)){
                return res.status(400).send("Bad request");
            }
            if(resultData?.length){
                return res.status(200).send(resultData);
            }
            else return res.status(404).send("No data found");
    }
    else {
        res.status(200).send(TASK_LIST)
    }
})

//Retrieve a single task by its ID.
routes.get('/tasks/:id',(req,res)=>{
    const taskId = parseInt(req.params.id);
    const requiredItem = TASK_LIST.find((obj)=>obj.id === taskId);
    if(requiredItem){
        return res.status(200).send(requiredItem);
    }
    else return res.status(404).send("Task for the following id was not found");
})


//Create a new task
routes.post('/tasks',(req,res)=>{
    const body = req.body;
    const searchedId = TASK_LIST?.find((val)=>body?.id === val?.id);
    const {isValid,err} = validateBody(body);
    if(isValid && !searchedId){
        TASK_LIST.push(body);
        return res.status(200).send({msg:"Task created successfully",data:TASK_LIST});
    }
    else {
        return res.status(400).send(err);
    }
})

//Update an existing task by its ID.
routes.put('/tasks/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const body = req.body;
    let updateIdx = TASK_LIST.findIndex((obj)=>obj.id === id);
    if(Object.keys(body).length && updateIdx !== -1){
        const filteredValue = TASK_LIST.filter((obj)=>obj.id !== id);
        if(body.hasOwnProperty('priority')){
            TASK_LIST[updateIdx].priority = body.priority;
        }
        else if(body.hasOwnProperty('completionDate')){
            TASK_LIST[updateIdx].priority = body.completionDate;
        }
        else if(body.hasOwnProperty('description')){
            TASK_LIST[updateIdx].description = body.description;
        }
        else if(body.hasOwnProperty('title')){
            TASK_LIST[updateIdx].title = body.title;
        }
        else if(body.hasOwnProperty('isCompleted')){
            TASK_LIST[updateIdx].isCompleted = body.isCompleted;
        }
        return res.status(200).send({msg:"Task pushed successfully",data:TASK_LIST});
    }
    else return res.status(400).send("Bad request");
})

//Delete a task by its ID.
routes.delete('/tasks/:id',(req,res)=>
    {
        const id = parseInt(req.params.id);
        const taskEle = TASK_LIST.findIndex((obj)=>obj.id === id);
        if(taskEle !== -1){
            TASK_LIST.splice(taskEle,1);
            return res.status(200).send({msg:"Task pushed successfully",data:TASK_LIST});
        }
        else return res.status(400).send("Bad request");
    }
)

//retrieve tasks based on priority level
routes.get('/tasks/priority/:level',(req,res)=>{
    const priorityLevel = req.params.level;
    let result = [];
    if(priorityLevel === Priority.high || priorityLevel === Priority.medium || priorityLevel === Priority.low){
        result = TASK_LIST.filter((obj)=>obj.priority === priorityLevel);
        return res.status(200).send(result);
    }
    else return res.status(400).send("Bad request");
})

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running and App is listening on port " + PORT);
    else
        console.log("Error occurred, server can't start", error);
    }
);