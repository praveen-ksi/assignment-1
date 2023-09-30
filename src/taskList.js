const { Priority } = require("./constants/task")

let TASK_LIST = [
    {
        id:1,
        title:"Go to gym 🏋️",
        description:"Go to gym in morning at 7:AM",
        isCompleted:true,
        priority:Priority.medium,
        completionDate:"20 Aug 2023"
    },
    {
        id:2,
        title:"Submit airtribe assignment 💻",
        description:"Submit assignme by 30 sep",
        isCompleted:false,
        priority:Priority.high
    },
    {
        id:3,
        title:"Go to office 🏢",
        description:"Go to office by 9:30 AM",
        isCompleted:true,
        priority:Priority.low,
        completionDate:"21 Aug 2023"
    }
]

module.exports = TASK_LIST