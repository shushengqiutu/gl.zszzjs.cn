export default {

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

