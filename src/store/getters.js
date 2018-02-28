export default {
    male(state, getters){
        let arr = [];
        state.tableData.forEach((ele,i)=>{
            if(ele.sex == 'male'){
                arr.push(ele)
            }
        });
        return arr
    },
    female(state, getters){
        let arr = [];
        state.tableData.forEach((ele,i)=>{
            if(ele.sex == 'female'){
                arr.push(ele)
            }
        });
        return arr
    },
    tableData(state, getters){
        return state.tableData
    },
    currentProTime(state,getters){
        let id = state.admin.current_project;
        let projects = state.admin.projects;

        let time = projects.find((ele)=>{
            return ele.id == id
        });
        return time.utime;
    },
    currentProCheckStatus(state,getters){
        let id = state.admin.current_project;
        let projects = state.admin.projects;

        let time = projects.find((ele)=>{
            return ele.id == id
        });
        return time.check_status;
    },
}

