<template>
    <div class="content">
        <Breadcrumb :location="location"></Breadcrumb>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="编写" name="first">
                <div>
                    <el-input v-model="title" placeholder="请输入标题"></el-input>
                    <!-- quill-editor插件标签 分别绑定各个事件-->
                    <quillEditor
                            v-model="content"
                            class="quill-editor"
                            ref="myQuillEditor"
                            :options="editorOption"
                    >

                    </quillEditor>
                    <el-row :gutter="20" style="margin-top: 20px;">
                        <el-col :span="10">
                            <el-upload
                                    class="upload-demo"
                                    :data="options"
                                    action="https://res.zszzjs.cn/upload.php"
                                    :on-remove="handleRemove"
                                    :multiple="false"
                                    :limit="1"
                                    :on-exceed="handleExceed"
                                    :on-success="uploadSuccess"
                                    :file-list="fileList">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">支持后缀为'gif','jpg','png','bmp','pdf','csv','xls','xlsx','ppt','pptx','pps','ppsx','doc','docx','txt','zip','rar','mp3','swf'的文件</div>
                            </el-upload>
                        </el-col>
                        <el-col :offset="11" :span="3">
                            <el-button   @click="cancel">取消</el-button>
                            <el-button type="primary" @click="publish">发布</el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-tab-pane>
            <el-tab-pane label="预览" name="second">
                <el-row>
                    <h3 class="title">{{title}}</h3>
                </el-row>
                <el-row :gutter="5">
                    <el-col :offset="18"  :span="4">{{ctime}}</el-col>
                    <el-col :span="2" >{{admin_name}}</el-col>
                </el-row>
                <el-row>
                    <div v-html="content">

                    </div>
                    <el-row>
                        下载附件:<a :href="file_url" :download="file_name">{{file_name}}</a>
                    </el-row>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Breadcrumb from './Breadcrumb';
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import http from '../lib/http';

    import { quillEditor } from 'vue-quill-editor'
    export default {
        name: 'WriteBrief',
        components:{Breadcrumb,quillEditor},
        data () {
            return {
                activeName: 'first',
                location:'简报',
                title  :'',
                content:'',
                editorOption:{
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{ 'header': 1 }, { 'header': 2 }],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'script': 'sub' }, { 'script': 'super' }],
                            [{ 'indent': '-1' }, { 'indent': '+1' }],
                            [{ 'direction': 'rtl' }],
                            [{ 'size': ['small', false, 'large', 'huge'] }],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [{ 'font': [] }],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'align': [] }],
                            ['clean'],
                        ]
                    }
                },
                options:{
                    module:'notice',
                    rule:'data',
                    huatus:'',
                },
                fileList:[],
                file_url:'',
                file_name:'暂无',
                admin_name:'',
                ctime:''
            }
        },
        mounted() {
            //上传需要huatus
            let userInfo = this.getCookie('huatus')
            if(userInfo){
                this.options.huatus = this.getCookie('huatus')
            }else{
                this.$message.warning('会话过期，请登陆')
            }
            this.admin_name = this.$store.state.admin.nickname;
            this.ctime = this.timestampToTime( new Date().getTime())

        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        },
        methods: {
            handleClick(tab, event) {

            },
            getCookie(name){
                let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
                return (arr=document.cookie.match(reg))?unescape(arr[2]):null;
            },
            onEditorChange({ quill, html, text }) {
                this.content = html
            },
            publish(){
                let id = this.$store.state.admin.current_project;
                let data = {};
                if(this.file_name){data.file_name = this.file_name}
                if(this.file_url){data.file_url = this.file_url}
                data.title = this.title;
                data.content = this.content;
                data.project_id = id;
                data.type = 3;
                if(this.title && this.content){
                    http.post({
                        url: '/gl/notice/newNotice',
                        data:data,
                    }).then(
                        (res)=>{
                            this.$message({type:'success',message:'发布成功'});
                            //this.$router.back();
                        }
                    ).catch(
                        e=> this.$message(e.message)
                    );
                }else{
                    this.$message({type:'error',message:'简报内容和标题必须填写'});
                }
            },
            cancel(){
                this.$router.back();
            },
            uploadSuccess(response, file, fileList){
                this.file_name = response.data.file_name;
                this.file_url = response.data.url;
            },
            handleRemove(){

            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前选择${files.length + fileList.length} 个文件`);
            },
            timestampToTime(timestamp) {
                let date = new Date(timestamp );
                let  Y = date.getFullYear() + '-';
                let  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                let D = date.getDate() + ' ';
                let  h = date.getHours() + ':';
                let  m = date.getMinutes() + ':';
                let  s = date.getSeconds();
                return Y+M+D+h+m+s;
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
        },

    }
</script>
