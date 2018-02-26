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
    }
}
