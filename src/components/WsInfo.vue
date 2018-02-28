<template>
    <div class="content">
        <Breadcrumb :location="location"></Breadcrumb>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" node-key="id"  highlight-current></el-tree>

        <div class="buttons">
            <el-button @click="getCheckedNodes">通过 node 获取</el-button>
            <el-button @click="getCheckedKeys">通过 key 获取</el-button>
            <el-button @click="setCheckedNodes">通过 node 设置</el-button>
            <el-button @click="setCheckedKeys">通过 key 设置</el-button>
            <el-button @click="resetChecked">清空</el-button>
        </div>
        <el-row>
            <el-table
                    class="table-student"
                    v-loading="loading"
                    :data="studentData"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="nickname"
                        label="姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="手机号/用户名"
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
    </div>
</template>

<script>
    import Breadcrumb from './Breadcrumb';
    import http from '../lib/http';
    export default {
        name: 'WsInfo',
        components:{Breadcrumb},
        data () {
            return {
                location:'工作坊学情统计',
                loading:false,
                studentData:[],
                currentPage:1,
                pageSize:20,
                totalData:0,
                data: [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        mounted(){
            let id = this.$store.state.admin.current_project;
            http.get({
                url: '/gl/project/workshop_xueqing',
                query:{
                    project_id: id
                }
            }).then((data)=>{
                console.log(data)
            })
        },
        methods:{
            handleSizeChange(val) {
                console.log(val);
            },
            handleCurrentChange(val) {
                console.log(val);
            },
            handleNodeClick(data){
                console.log(data)
            },
            getCheckedNodes() {
                console.log(this.$refs.tree.getCheckedNodes());
            },
            getCheckedKeys() {
                console.log(this.$refs.tree.getCheckedKeys());
            },
            setCheckedNodes() {
                this.$refs.tree.setCheckedNodes([{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 9,
                    label: '三级 1-1-1'
                }]);
            },
            setCheckedKeys() {
                this.$refs.tree.setCheckedKeys([3]);
            },
            resetChecked() {
                this.$refs.tree.setCheckedKeys([]);
            }
        }
    }
</script>
