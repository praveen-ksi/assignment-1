const TASK_LIST = require("../taskList")

function validateBody(obj){
    if(!obj?.id || !obj?.value){
        return {isValid:false,err:"Incomplete data"}
    }
    else if(TASK_LIST?.includes(obj)){
        return{isValid:false,err:"Value already exists"};
    }
    return {isValid:true,err:""}
}

module.exports = validateBody;