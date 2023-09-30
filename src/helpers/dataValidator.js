const TASK_LIST = require("../taskList")

function validateBody(obj){
    if(!obj?.id || !obj?.title || !obj?.description || typeof obj?.isCompleted !== 'boolean'){
        return {isValid:false,err:"Incomplete data"}
    }
    return {isValid:true,err:""}
}

module.exports = validateBody;