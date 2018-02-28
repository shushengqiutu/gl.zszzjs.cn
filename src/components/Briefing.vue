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
            <el-radio v-model="radio" label="0" @change="aa">全部</el-radio>
            <el-radio v-model="radio" label="1" @change="aa">male</el-radio>
            <el-radio v-model="radio" label="2" @change="aa">female</el-radio>
            <el-table
                    v-loading="loading"
                    :data="tableData"
                    stripe
                    @row-click="test"
                    style="width: 100%">
                <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="性别">
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
    import Breadcrumb from './Breadcrumb';
    export default {
        name: 'Briefing',
        components:{
            Breadcrumb,
        },
        data () {
            return {
                location:'项目学情统计',
                loading: true,
                radio:'0',
                input:'',
                select:'',
                currentPage:1,
                visiable:false,
                userInfo:''
            }
        },
        computed:{
          tableData(){
              return this.$store.state.allData;
          },
        },
        mounted(){
         this.$store.commit('male','0')
         this.loading = false;
        },
        methods:{
            aa(){
                if(this.radio == '1'){
                   this.$store.commit('male','1')
                }else if(this.radio == '2'){
                    this.$store.commit('male','2')
                }else{
                    this.$store.commit('male','0')
                }
            },
            selectData(){
                console.log(this.input,this.select)
                if(this.input&&this.select){
                    this.$store.commit('selectData',{type:this.select,value:this.input})
                }
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

