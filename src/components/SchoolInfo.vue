<template>
    <div class="content">
        <Breadcrumb :location="location"></Breadcrumb>
        <el-row style="margin:5px 0">
            <el-col :span="8">
                <el-select v-model="value" placeholder="请选择学校名称搜索">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" @click="selectData">确定</el-button>
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
                        prop="date"
                        label="学校名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="学员总数"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="登录人数">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="学习人数">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="合格人数">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="参训率(100%)">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="学习率(100%)">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label=" 合格率(100%)">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="平均看课数量（个）">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="研修日志数">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="完成作业数">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="优秀成果数（被推优次数）">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="参与活动人次">
                </el-table-column>
                <el-table-column
                        prop="sex"
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
    import Breadcrumb from './Breadcrumb';
    export default {
        name: 'SchoolInfo',
        components:{
            Breadcrumb,
        },
        data () {
            return {
                location:'学校学情统计',
                loading: true,
                radio:'0',
                input:'',
                select:'',
                currentPage:1,
                visiable:false,
                userInfo:'',
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: ''
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

