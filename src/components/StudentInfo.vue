<template>
    <div class="content">
        <Breadcrumb :location="location"></Breadcrumb>
        <el-row :gutter="20" style="margin: 10px;">
            <el-col :span="4" >
                <el-select v-model="selectSchool" placeholder="请选择学校" :clearable="true" @clear="doSearch">
                    <el-option
                            v-for="item in schools"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select v-model="selectWs" placeholder="请选择工作坊" :clearable="true" @clear="doSearch">
                    <el-option
                            v-for="item in workShops"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>

            </el-col>
            <el-col :span="6">
                <el-input v-model="serachOrder" placeholder="请输入姓名或手机" :inline="true"></el-input>
            </el-col>
           <el-col :span="2">
               <el-button type="primary" @click="doSearch">确定</el-button>
           </el-col>
        </el-row>
        <el-row>
            <el-table
                    class="table-student"
                    height="320"
                    v-loading="loading"
                    :data="studentData"
                    stripe
                    @row-click="test"
                    style="width: 100%">
                <el-table-column
                        prop="nickname"
                        label="姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="手机号/用户名"
                        :formatter="formatterUser"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="employer"
                        label="所属学校（工作单位)">
                </el-table-column>
                <el-table-column
                        prop="workshop_name"
                        label="所属工作坊">
                </el-table-column>
                <el-table-column
                        prop="is_login"
                        label="是否参训">
                </el-table-column>
                <el-table-column
                        prop="is_learn"
                        label="是否学习">
                </el-table-column>
                <el-table-column
                        prop="is_pass"
                        label="是否合格">
                </el-table-column>
                <el-table-column
                        prop="getAllScore"
                        label="总成绩">
                </el-table-column>
            </el-table>
        </el-row>
        <el-row>
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[20, 40, 60, 100]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalData">
                </el-pagination>
            </div>
        </el-row>
        <el-dialog title="学员详细信息" :visible.sync="visiable">
            <div>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="sl_Table" style="margin-top:10px;">
                    <tbody >
                    <tr>
                        <td  class="bold">
                            <span class="FB">姓名:</span>
                        </td>
                        <td colspan="2">
                            {{userInfo.nickname}}
                        </td>
                        <td class="bold">
                            手机号
                        </td>
                        <td colspan="2">
                            {{userInfo.phone}}
                        </td>
                    </tr>
                    <tr>
                        <td  height="30" class="bold">
                            <span class="FB">所属单位:</span>
                        </td>
                        <td  colspan="2">
                            {{userInfo.employer}}
                        </td>
                        <td class="bold">
                            <span class="FB">所属工作坊:</span>
                        </td>
                        <td colspan="2">
                            {{userInfo.workshop_name}}
                        </td>
                    </tr>
                    <tr>
                        <td  class="bold" >
                            <span class="FB">是否合格:</span>
                        </td>
                        <td>
                            {{userInfo.is_pass}}
                        </td>
                        <td  class="bold">
                            <span class="FB">是否参训:</span>
                        </td>
                        <td>
                            {{userInfo.is_login}}
                        </td>
                        <td   class="bold">
                            <span class="FB">是否学习:</span>
                        </td>
                        <td>
                           {{userInfo.is_learn}}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="sl_Table" style="margin-top:10px;">
                    <tbody class="sl_Table">
                    <tr>
                        <td  class="bold">
                            <span class="FB">总成绩:</span>
                        </td>
                        <td>
                            {{userInfo.getAllScore}}
                        </td>
                        <td class="bold">
                            课程学习
                        </td>
                        <td>
                            {{userInfo.getNetclassScore}}
                        </td>
                        <td class="bold">
                            作业
                        </td>
                        <td>
                            {{userInfo.getHomeworkScore}}
                        </td>
                    </tr>
                    <tr>
                        <td  class="bold">
                            <span class="FB">研修日志:</span>
                        </td>
                        <td>
                            {{userInfo.getYxrzScore}}
                        </td>
                        <td class="bold">
                            主题研修
                        </td>
                        <td>
                            {{userInfo.getZtyxScore}}
                        </td>
                        <td class="bold">
                            校本研修
                        </td>
                        <td>
                            {{userInfo.getXxhdScore}}
                        </td>
                    </tr>
                    <tr>
                        <td class="bold">
                            <span class="FB">登录次数:</span>
                        </td>
                        <td>
                            {{userInfo.login_day_count}}
                        </td>
                        <td class="bold" >
                            课程
                        </td>
                        <td>
                            {{userInfo.lesson_count}}
                        </td>
                        <td class="bold">
                            日志
                        </td>
                        <td>
                            {{userInfo.yxrzCount}}
                        </td>
                    </tr>
                    <tr>
                        <td  class="bold">
                            <span class="FB">作业:</span>
                        </td>
                        <td>
                            {{userInfo.doneHwCount}}
                        </td>
                        <td colspan="3" class="bold">
                            优秀成果数（被推优次数）
                        </td>
                        <td>
                            {{userInfo.goodHwCount}}
                        </td>
                    </tr>
                    <tr>
                       <!-- <td  class="bold">
                            <span class="FB">活动:</span>
                        </td>
                        <td>
                            {{userInfo.doneHdCount}}
                        </td>-->
                        <td class="bold">
                            互动交流
                        </td>
                        <td colspan="5">
                            {{userInfo.discuzCount}}
                        </td>
                    </tr>
                    </tbody>
                </table>
                {{userInfo}}
            </div>
        </el-dialog>

    </div>
</template>

<script>

    import {mapGetters} from 'vuex';
    import http from '../lib/http';
    import Breadcrumb from './Breadcrumb';
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
        name: 'Briefing',
        components:{
            Breadcrumb,
        },
        data () {
            return {
                location:'学员学情统计',
                loading: true,
                selectSchool:'',
                selectWs:'',
                serachOrder:'',
                currentPage:1,
                visiable:false,
                userInfo:'',
                schools:[],
                workShops:[],
                pageSize:20,
                totalData:0,
                studentData:[],
                filtered:false,
                filteredData:[],
            }
        },
        computed:{

        },
        mounted(){

            if(this.$route.query.wsid){
                this.selectWs = this.$route.query.wsid
            }
            let schoolData = this.$store.state.studentData;
            let schools =[],workShops=[];
            schoolData.map(function(ele,index){
                schools.push({label:ele.employer, value:ele.employer});
                workShops.push({label:ele.workshop_name, value:ele.workshop_id})
                schools = unique(schools)
                workShops = unique(workShops)
            });

            if(this.$route.query.wsid){
               let data = this.$store.state.studentData.filter(ele=>{
                   return ele.workshop_id == this.$route.query.wsid ;
               })
                this.studentData = tablePagination(data,this.currentPage,this.pageSize);
                this.totalData = data.length;
            }else{
                this.studentData = tablePagination(this.$store.state.studentData,this.currentPage,this.pageSize);
                this.totalData = this.$store.state.studentData.length;
            }
            this.schools = schools;
            this.workShops = workShops;
            this.loading =false;
        },
        methods:{
            formatterUser(row){
               if(row.phone== '' || row.phone== null){
                   return row.user_name
               }else{
                   return row.phone
               }
            },
            handleSizeChange(val) {
                this.pageSize =val;
                if(this.filtered){
                    this.studentData = tablePagination(this.filteredData,this.currentPage,val);
                }else{
                    this.studentData = tablePagination(this.$store.state.studentData,this.currentPage,val);
                }
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                if(this.filtered){
                    this.studentData = tablePagination(this.filteredData,val,this.pageSize);
                }else{
                    this.studentData = tablePagination(this.$store.state.studentData,val,this.pageSize);
                }
            },
            test(row){
                this.visiable = true;
                this.userInfo = row ;
            },
            doSearch(){
                if(!this.selectSchool && !this.serachOrder && !this.selectWs){
                    this.studentData = tablePagination(this.$store.state.studentData,this.currentPage,this.pageSize);
                    this.totalData = this.$store.state.studentData.length;
                    this.$message({type:'error',message:'请选择学校或者选择工作坊或者输入姓名或手机进行搜索'});
                    return;
                }

                if( this.selectSchool && this.serachOrder && this.selectWs){

                    let data =  this.$store.state.studentData;

                    let is_number =  /^\d+$/.test(this.serachOrder);
                    let sData = [];
                    if(is_number){
                        sData= this.studentData=data.filter((ele)=>{
                            return (ele.employer == this.selectSchool && ele.phone.startsWith(this.serachOrder) && ele.workshop_id == this.selectWs)
                        });
                    }else{
                        sData =data.filter((ele)=>{
                            return (ele.employer == this.selectSchool && ele.nickname.startsWith(this.serachOrder) && ele.workshop_id == this.selectWs)
                        })

                    }
                    this.studentData = tablePagination(sData,1,this.pageSize);
                    this.filteredData = sData;
                    this.filtered = true;
                    this.totalData = sData.length;
                }

                if(this.selectSchool  && this.selectWs &&!this.serachOrder){
                    let data =  this.$store.state.studentData;
                    let sData  = data.filter((ele)=>{
                        return (ele.employer == this.selectSchool && ele.workshop_id == this.selectWs)
                    });
                    this.studentData = tablePagination(sData,1,this.pageSize);
                    this.filteredData = sData;
                    this.filtered = true;
                    this.totalData = sData.length;
                }
                if(this.selectSchool  && !this.selectWs &&!this.serachOrder){
                    let data =  this.$store.state.studentData;
                    let sData  = data.filter((ele)=>{
                        return (ele.employer == this.selectSchool)
                    });
                    this.studentData = tablePagination(sData,1,this.pageSize);
                    this.filteredData = sData;
                    this.filtered = true;
                    this.totalData = sData.length;
                }

                if(!this.selectSchool  && this.selectWs &&!this.serachOrder){
                    let data =  this.$store.state.studentData;
                    let sData  = data.filter((ele)=>{
                        return (ele.workshop_id == this.selectWs)
                    });
                    this.studentData = tablePagination(sData,1,this.pageSize);
                    this.filteredData = sData;
                    this.filtered = true;
                    this.totalData = sData.length;
                }

                if(this.selectSchool  && !this.selectWs && this.serachOrder){
                    let data =  this.$store.state.studentData;
                    let is_number =  /^\d+$/.test(this.serachOrder);
                    let sData = [];
                    if(is_number){
                        sData  = data.filter((ele)=>{
                            return (ele.employer == this.selectSchool && ele.phone.startsWith(this.serachOrder) )
                        });
                    }else{
                        sData =data.filter((ele)=>{
                            return (ele.employer == this.selectSchool && ele.nickname.startsWith(this.serachOrder) )
                        })
                    }
                    this.studentData = tablePagination(sData,1,this.pageSize);
                    this.filteredData = sData;
                    this.filtered = true;
                    this.totalData = sData.length;
                }

                if(!this.selectSchool  && this.selectWs && this.serachOrder){
                    let data =  this.$store.state.studentData;
                    let is_number =  /^\d+$/.test(this.serachOrder);
                    let sData = [];
                    if(is_number){
                        sData  = data.filter((ele)=>{
                            return (ele.workshop_id == this.selectWs && ele.phone.startsWith(this.serachOrder) )
                        });
                    }else{
                        sData =data.filter((ele)=>{
                            return (ele.workshop_id == this.selectWs && ele.nickname.startsWith(this.serachOrder) )
                        })
                    }
                    this.studentData = tablePagination(sData,1,this.pageSize);
                    this.filteredData = sData;
                    this.filtered = true;
                    this.totalData = sData.length;
                }

                if(!this.selectSchool  && !this.selectWs && this.serachOrder){
                    let data =  this.$store.state.studentData;
                    let is_number =  /^\d+$/.test(this.serachOrder);
                    let sData = [];
                    if(is_number){
                        sData  = data.filter((ele)=>{
                            return ( ele.phone.startsWith(this.serachOrder) )
                        });
                    }else{
                        sData =data.filter((ele)=>{
                            return ( ele.nickname.startsWith(this.serachOrder) )
                        })
                    }
                    this.studentData = tablePagination(sData,1,this.pageSize);
                    this.filteredData = sData;
                    this.filtered = true;
                    this.totalData = sData.length;
                }



            }
        }
    }
</script>

<style>
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
</style>


