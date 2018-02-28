<template>
    <div class="content">
        <Breadcrumb :location="location"></Breadcrumb>
        <div>

                <el-input v-model="title" placeholder="请输入标题"></el-input>
                <!-- quill-editor插件标签 分别绑定各个事件-->
                <quillEditor
                        v-model="content"
                        class="quill-editor"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @ready="onEditorReady($event)"
                >

                </quillEditor>
            <el-row>

                <el-upload
                        class="upload-demo"
                        :data="options"
                        action="https://res.zszzjs.cn/upload.php"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :multiple="false"
                        :limit="1"
                        :on-exceed="handleExceed"
                        :on-success="uploadSuccess"
                        :file-list="[]">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">支持后缀为'gif','jpg','png','bmp','pdf','csv','xls','xlsx','ppt','pptx','pps','ppsx','doc','docx','txt','zip','rar','mp3','swf'的文件</div>
                </el-upload>
            </el-row>
            <el-row :gutter="20">
                <el-col :offset="21" :span="3">
                    <el-button   @click="cancel">取消</el-button>
                    <el-button type="primary" @click="publish">发布</el-button>

                </el-col>
            </el-row>

        </div>
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
        name: 'WriteNotice',
        components:{Breadcrumb,quillEditor},
        data () {
            return {
                location:'发布公告',
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
                    huatus:'0d577baee3e4e44f1386ad9752dc9ca5',
                },
                file_url:'',
                file_name:''
            }
        },
        mounted() {
            console.log('this is current quill instance object', this.editor)
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        },
        methods: {
            onEditorBlur(quill) {
                console.log('editor blur!', quill)
            },
            onEditorFocus(quill) {
                console.log('editor focus!', quill)
            },
            onEditorReady(quill) {
                console.log('editor ready!', quill)
            },
            onEditorChange({ quill, html, text }) {
                console.log('editor change!', quill, html, text)
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
                data.type = 1;
                http.post({
                    url: '/gl/notice/newNotice',
                    data:data,
                }).then(
                    (res)=>{
                        if(res.ecode==0){
                            this.$message({type:'success',message:'发布成功'});
                        }else{
                            this.$message({type:'error',message:res.emsg})
                        }
                    }
                ).catch(
                    e=> this.$message(e.message)
                );

            },
            cancel(){
                this.$router.back();
            },
            uploadSuccess(response, file, fileList){
                this.file_name = file.name;
                this.file_url = file.url;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前选择${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
        },

    }
</script>
