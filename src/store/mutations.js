export const state = {
    admin:{},
    tableData:[{
        date: '2016-05-03',
        name: '王大虎',
        address: '上海市普陀区金沙江路 1518 弄',
        sex:'male'
    }, {
        date: '2016-05-02',
        name: '王二虎',
        address: '上海市普陀区金沙江路 1518 弄',
        sex:'male'
    }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        sex:'female'
    },
    {
        date: '2016-05-04',
        name: '王4虎',
        address: '上海市普陀区金沙江路 1518 弄',
        sex:'female'
    },
    {
        date: '2016-05-04',
        name: '王5虎',
        address: '上海市普陀区金沙江路 1518 弄',
        sex:'female'
    }],
    allData:[],
    maleData:[],
    femaleData:[],
    project:[
        {
            value: '选项1',
            label: '项目1'
        }, {
            value: '选项2',
            label: '项目2'
        }, {
            value: '选项3',
            label: '项目3'
        }, {
            value: '选项4',
            label: '项目4'
        }, {
            value: '选项5',
            label: '项目5'
        }
    ]
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
};

