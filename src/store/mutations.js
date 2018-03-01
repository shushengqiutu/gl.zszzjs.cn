export const state = {
    admin:JSON.parse(window.localStorage.getItem('adminInfo'))||{},
    studentData:JSON.parse(window.localStorage.getItem('studentData'))||{},
    previewNoticeData:{}

};
export const mutations = {
    male(state,value){
        console.log(value)
        if(value == '1'){
            let arr =[];
            state.tableData.forEach((ele,i)=>{
                if(ele.sex == 'male'){
                    arr.push(ele)
                }
            });
           state.allData = arr
        }else if(value == '2'){
            let arr =[];
            state.tableData.forEach((ele,i)=>{
                if(ele.sex == 'female'){
                    arr.push(ele)
                }
            });
            state.allData = arr
        }else{
            let arr =[];
            state.tableData.forEach((ele,i)=>{
                    arr.push(ele)
            });
            console.log('xxxx')
            console.log(arr)
            state.allData = arr;
        }
    },
    selectData(state,select){
        console.log(select)
        if(select.type == '1'){
            let arr =[];
            state.tableData.forEach((ele,i)=>{
                if(ele.name == select.value){
                    arr.push(ele)
                }
            });
            state.allData = arr
        }
        if(select.type == '2'){
            let arr =[];
            state.tableData.forEach((ele,i)=>{
                if(ele.sex == select.value){
                    arr.push(ele)
                }
            });
            state.allData = arr
        }
    },
    getAdminInfo(state,value){
        state.admin = value ;
    },
    getStudentData(state,value){
        state.studentData = value ;
    },
    savePreviewNoticeData(state,value){
        state.previewNoticeData = value ;
    }
};

