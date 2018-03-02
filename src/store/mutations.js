export const state = {
    admin:JSON.parse(window.localStorage.getItem('adminInfo'))||{},
    studentData:JSON.parse(window.localStorage.getItem('studentData'))||{},
};
export const mutations = {

    getAdminInfo(state,value){
        state.admin = value ;
    },
    getStudentData(state,value){
        state.studentData = value ;
    },
    setProjectId(state,value){
        state.admin.current_project = value ;
    },
};

