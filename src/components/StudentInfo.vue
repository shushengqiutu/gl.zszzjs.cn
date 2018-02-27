<template>
    <div class="content">
        <Breadcrumb :location="location"></Breadcrumb>
        <el-row style="margin:30px 0">
            <el-col :span="8">
                <el-input placeholder="请输入内容" v-model="input" class="input-with-select select-order" >
                    <el-select v-model="select" slot="prepend" placeholder="请选择搜索条件" :clearable="true" @change="">
                        <el-option label="姓名" value="1"></el-option>
                        <el-option label="性别" value="2"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="selectData"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-table
                    v-loading="loading"
                    :data="tableData"
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
                        :formatter="setFormatterUser"
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
                        prop="employer"
                        :formater="formaterLogin"
                        label="是否参训">
                </el-table-column>
                <el-table-column
                        prop="is_login"
                        :formater="formaterLearn"
                        label="是否学习">
                </el-table-column>
                <el-table-column
                        prop="is_pass"
                        :formater="formaterPass"
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
                        :page-sizes="[1, 2, 3, 4]"
                        :page-size="2"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="tableData.length">
                </el-pagination>
            </div>
        </el-row>
        <el-dialog title="教师详细信息" :visible.sync="visiable">
            <div>
                {{userInfo}}
            </div>
        </el-dialog>
    </div>
</template>

<script>

    import {mapGetters} from 'vuex';
    import http from '../lib/http';
    import Breadcrumb from './Breadcrumb';
    export default {
        name: 'Briefing',
        components:{
            Breadcrumb,
        },
        data () {
            return {
                location:'学员学情统计',
                loading: true,
                radio:'0',
                input:'',
                select:'',
                currentPage:1,
                visiable:false,
                userInfo:'',
                tableData:[]
            }
        },
        computed:{

        },
        mounted(){
            let id = this.$store.state.admin.current_project
            http.get({
                url: '/gl/project/student_xueqing',
                query:{
                    project_id: id
                }
            }).then(
                (data)=>{
                    this.tableData = data;
                    console.log(data)
                }
            ).catch(
                e=> this.$message(e.message)
            );
            this.$store.commit('male','0')
            this.loading = false;
        },
        methods:{
            selectData(){
                console.log(this.input,this.select)
                if(this.input&&this.select){
                    this.$store.commit('selectData',{type:this.select,value:this.input})
                }
            },
            setFormatterUser(row,column){

               if(row.phone== '' || row.phone== null){
                   return row.user_name
               }else{
                   return row.phone
               }
            },
            formaterLogin(row){
             console.log(row.is_login)
             console.log('是')

              return  '是'
            },
            formaterLearn(row){
                return  row.is_learn ?'是':'否'
            },
            formaterPass(row){
                return  row.is_pass ?'是':'否'
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            test(row){
                console.log(row)
                this.visiable = true;
                this.userInfo = row ;
            }
        }
    }
</script>

<style>
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
</style>


