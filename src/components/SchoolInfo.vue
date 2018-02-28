<template>
    <div class="content">
        <Breadcrumb :location="location"></Breadcrumb>
        <el-row style="margin:5px 0">
            <el-col :span="8">
                <el-select v-model="value" placeholder="请选择学校名称搜索" clearbale>
                    <el-option
                            v-for="item in filterSchools"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" @click="selectBySchool">确定</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-table
                    v-loading="loading"
                    :data="filterSchoolData"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="schoolName"
                        label="学校名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="userCount"
                        label="学员总数">
                </el-table-column>
                <el-table-column
                        prop="loginCount"
                        label="登录人数">
                </el-table-column>
                <el-table-column
                        prop="studyCount"
                        label="学习人数">
                </el-table-column>
                <el-table-column
                        prop="passCount"
                        label="合格人数">
                </el-table-column>
                <el-table-column
                        prop="joinRate"
                        label="参训率(100%)">
                </el-table-column>
                <el-table-column
                        prop="studyRate"
                        label="学习率(100%)">
                </el-table-column>
                <el-table-column
                        prop="passRate"
                        label=" 合格率(100%)">
                </el-table-column>
                <el-table-column
                        prop="lesson_count_average"
                        label="平均看课数量（个）">
                </el-table-column>
                <el-table-column
                        prop="yxrzCount"
                        label="研修日志数">
                </el-table-column>
                <el-table-column
                        prop="doneHwCount"
                        label="完成作业数">
                </el-table-column>
                <el-table-column
                        prop="goodHwCount"
                        label="优秀成果数（被推优次数）">
                </el-table-column>
                <el-table-column
                        prop="doneHdCount"
                        label="参与活动人次">
                </el-table-column>
                <el-table-column
                        prop="discuzCount"
                        label="互动交流次数">
                </el-table-column>
            </el-table>
        </el-row>
        <el-row>
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="filterSchoolData.length">
                </el-pagination>
            </div>
        </el-row>

    </div>
</template>

<script>

    import {mapGetters} from 'vuex';
    import Breadcrumb from './Breadcrumb';
    function reduce(arr){
        let data ={
            userCount:arr.length,
            loginCount:0,
            studyCount:0,
            passCount:0,
            studyCourseUserCount:0,
            studyCourseCount:0,
            yxrzCount:0,
            doneHwCount:0,
            goodHwCount:0,
            doneHdCount:0,
            discuzCount:0,
        };
        for(let i=0;i<arr.length;i++){
            if(arr[i].is_login == 'true' || arr[i].is_login == '是'){
                data.loginCount += 1;
            }
            if(arr[i].is_learn == 'true' || arr[i].is_learn == '是'){
                data.studyCount += 1;
            }
            if(arr[i].is_pass == 'true' || arr[i].is_pass == '是'){
                data.passCount += 1;
            }
            if(arr[i].lesson_count>0){
                data.studyCourseUserCount += 1;
                data.studyCourseCount += arr[i].lesson_count;
            }
            data.yxrzCount += arr[i].yxrzCount;
            data.doneHwCount += arr[i].doneHwCount;
            data.goodHwCount += arr[i].goodHwCount;
            data.doneHdCount += arr[i].doneHdCount;
            data.discuzCount += arr[i].discuzCount;

            data.schoolName = arr[i].employer;
        }
        data.joinRate = (data.loginCount / data.userCount).toFixed(2)*100 ;
        data.studyRate =  (data.studyCount / data.userCount).toFixed(2)*100  ;
        data.passRate = (data.passCount / data.userCount).toFixed(2)*100   ;
        if(data.studyCourseUserCount){
            data.lesson_count_average =  (data.studyCourseCount / data.studyCourseUserCount).toFixed(2)  ;
        }else{
            data.lesson_count_average = 0;
        }
        return data
    }
    function unique(list) {
        let arr = [],b;
        for (let i = 0; i < list.length; i++) {
            if (i == 0) arr.push(list[i]);
            b = false;
            if (arr.length > 0 && i > 0) {
                for (let j = 0; j < arr.length; j++) {
                    if (arr[j].label == list[i].label) {
                        b = true;
                    }
                }
                if (!b) {
                    arr.push(list[i]);
                }
            }
        }
        return arr;
    }
    function tablePagination(data,currentPage,pageSize,){
        let startNum = ( currentPage-1 ) * pageSize;
        let endNum = startNum + pageSize;
        let array = data.slice(startNum, endNum);
        return array;
    }
    export default {
        name: 'SchoolInfo',
        components:{
            Breadcrumb,
        },
        data () {
            return {
                location:'学校学情统计',
                loading: true,
                currentPage:1,
                pageSize:10,
                visiable:false,
                schoolAllData:[],
                filterSchools:[],
                filterSchoolData:[],
                value: '',
            }
        },
        computed:{
            tableData(){
                return this.$store.state.allData;
            },
        },
        mounted(){
            let data = this.$store.state.studentData;
            let combinedData = {};
            let schoolsInfo= [];
            let schools =[];
            for(let i=0;i<data.length;i++){
                if(combinedData[data[i].employer]){
                    combinedData[data[i].employer].push(data[i])
                }else{
                    combinedData[data[i].employer] =[data[i]];
                }
            }
            for(let j in combinedData){
                schoolsInfo.push(reduce(combinedData[j]))
            }

            this.schoolAllData = schoolsInfo;
            this.filterSchoolData = tablePagination(schoolsInfo,this.currentPage,this.pageSize);

            data.map(function(ele,index){
                schools.push({label:ele.employer, value:ele.employer});
                schools = unique(schools)
            });

            this.filterSchools = schools;
            this.loading = false;
        },
        methods:{
            selectData(){
                console.log(this.input,this.select)
                if(this.input&&this.select){
                    this.$store.commit('selectData',{type:this.select,value:this.input})
                }
            },
            handleSizeChange(val) {
                this.schoolAllData = tablePagination(this.filterSchoolData,this.currentPage,val);
            },
            handleCurrentChange(val) {
                this.schoolAllData = tablePagination(this.filterSchoolData,val,this.pageSize);
            },
            test(row){
                console.log(row)
                this.visiable = true;
                this.userInfo = row ;
            },
            selectBySchool(){
                if( this.value == '' ){
                    this.$message({type:'error',message:'请选择学校'});
                    return ;
                }
                this.filterSchoolData =  this.schoolAllData.filter((ele)=>{
                    return ele.schoolName == this.value
                });
            }
        }
    }
</script>

<style>
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
</style>

