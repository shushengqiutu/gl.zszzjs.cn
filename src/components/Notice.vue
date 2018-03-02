<template>
    <div class="content">
        <Breadcrumb :location="location"></Breadcrumb>
        <div>
            <el-row class="clearfix notice-mb">
                <el-button  class="fr" type="primary" @click="toPublishNotice"><i class="el-icon-edit"></i>发布</el-button>

            </el-row>   <hr>

            <el-table
                    :data="tableData"
                    v-loading="loading"
                    height="320"
                    class="table-student"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="title"
                        label="标题"
                        >
                </el-table-column>
                <el-table-column
                        prop="admin_name"
                        label="发布者"
                       >
                </el-table-column>
                <el-table-column
                        prop="ctime"
                        label="发布时间">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleLook(scope.row)" type="text" size="small">查看</el-button>
                        <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    layout="total, prev, pager, next"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import Breadcrumb from './Breadcrumb';

    import http from '../lib/http';

    export default {
        name: 'Notice',
        components:{Breadcrumb},
        data () {
            return {
                location:'公告管理',
                tableData:[],
                currentPage:1,
                pageSize:20,
                total:0,
                loading:true,
            }
        },
        mounted() {
            let id = this.$store.state.admin.current_project;

            this.getNoticeList(id,this.currentPage,this.pageSize)
        },
        computed: {

        },
        methods: {
            handleLook(row){
                this.$router.push({
                    path:'/NoticeDetail',
                    query:{id:row.id},
                })
            },
            handleDelete(row){
                let adminId = this.$store.state.admin.id;
                if(row.admin_id == adminId){
                    http.get({
                        url: '/gl/notice/delNotice',
                        query:{
                            id: row.id,
                        }
                    }).then(
                        (data)=>{
                            this.$message({type:'success',message:'删除成功'})
                        }
                    ).catch(
                        e=> {
                            this.$message({type:'error',message:e.message})
                        }
                    );
                }else{
                    this.$message({type:'error',message:'无权限，你只能删除自己发布的公告'})
                }

            },
            handleSizeChange(val) {
                this.pageSize = val;
                let id = this.$store.state.admin.current_project;
                this.getNoticeList(id,this.currentPage,val)
            },
            handleCurrentChange(val) {
                this.currentPage =val ;
                let id = this.$store.state.admin.current_project;
                this.getNoticeList(id,val,this.pageSize)
            },
            getNoticeList(id,page,size){
                http.get({
                    url: '/gl/notice/noticelist',
                    query:{
                        project_id: id,
                        p:page,
                        size:size,
                        type:1
                    }
                }).then(
                    (data)=>{
                        this.loading =false
                        this.tableData =  data.notice_list
                        this.total =  data.notice_count
                    }
                ).catch(
                    e=>{
                        this.$message({type:'error',message:e.message})
                    }
                );
            },
            toPublishNotice(){
                this.$router.push({path:'/WriteNotice',name:'WriteNotice'})
            }
        },

    }
</script>
