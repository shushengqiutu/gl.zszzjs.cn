<template>
    <div class="content">
        <Breadcrumb :location="location"></Breadcrumb>
        <div>
            <el-row>
                <el-row>
                    <h3 class="title">{{notice.title}}</h3>
                </el-row>
                <el-row :gutter="5">
                    <el-col :offset="18"  :span="4">{{notice.ctime}}</el-col>
                    <el-col :span="2" >{{notice.admin_name}}</el-col>
                </el-row>
                <el-row>
                    <div v-html=" notice.content">

                    </div>
                    <el-row>
                        下载附件:<a :href="notice.file_url" :download="notice.file_name">{{notice.file_name}}</a>
                    </el-row>
                </el-row>
            </el-row>
        </div>
    </div>
</template>

<script>
    import Breadcrumb from './Breadcrumb';
    import http from '../lib/http';

    export default {
        name: 'BriefDetail',
        components:{Breadcrumb},
        data () {
            return {
                location:'简报详情',
                notice:{},
            }
        },
        mounted() {
            let noticeId = this.$route.query.id;
            if(noticeId){
                http.get({
                    url: '/gl/notice/getNoticeInfo',
                    query:{
                        id: noticeId,
                    }
                }).then(
                    (data)=>{
                        this.notice = data ;
                    }
                ).catch(
                    e=> {
                        this.$message({type:'error',message:e.message})
                    }
                );
            }
        },
        computed: {

        },
        methods: {

        },

    }
</script>
