<template>
    <div class="content">
        <Breadcrumb :location="location"></Breadcrumb>
        <el-tree ref="tree" :data="treeData" :props="defaultProps" @node-click="handleNodeClick" node-key="id"  highlight-current></el-tree>
        <el-row>
            <el-table
                    v-loading="loading"
                    height="320"
                    class="table-student"
                    :data="onePageData"
                    :row-class-name="tableRowClassName"
                    @cell-click="lookWsInfo"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="workshop_name"
                        label="工作坊名称"

                        width="180">
                </el-table-column>
                <el-table-column
                        prop="num"
                        label="学员总数">
                </el-table-column>
                <el-table-column
                        prop="login"
                        label="登录人数">
                </el-table-column>
                <el-table-column
                        prop="learn"
                        label="学习人数">
                </el-table-column>
                <el-table-column
                        prop="pass"
                        label="合格人数">
                </el-table-column>
                <el-table-column
                        prop="loginPercent"
                        label="参训率(100%)">
                </el-table-column>
                <el-table-column
                        prop="learnPercent"
                        label="学习率(100%)">
                </el-table-column>
                <el-table-column
                        prop="passPercent"
                        label=" 合格率(100%)">
                </el-table-column>
                <el-table-column
                        prop="lessonNum"
                        label="平均看课数量"
                        :formatter="formatterLesson"
                >
                </el-table-column>
                <el-table-column
                        prop="yxrzCount"
                        label="研修日志数">
                </el-table-column>
                <el-table-column
                        prop="goodHwCount"
                        label="优秀成果数">
                </el-table-column>
               <!-- <el-table-column
                        prop="doneHdCount"
                        label="参与活动人次">
                </el-table-column>-->
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
                        :page-sizes="[5, 10, 20, 40]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </el-row>
    </div>
</template>

<script>
    function tablePagination(data,currentPage,pageSize,){
        let startNum = ( currentPage-1 ) * pageSize;
        let endNum = startNum + pageSize;
        let array = data.slice(startNum, endNum);
        return array;
    }

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
                filterStudentData:[],
                onePageData:[],
                currentPage:1,
                pageSize:1,
                total:1,
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                }
            }
        },
        computed:{
        },
        mounted(){
            let id = this.$store.state.admin.current_project;
            http.get({
                url:'/gl/project/workshop_xueqing',
                query:{
                    project_id: id
                }
            }).then(
                (res)=>{
                    this.studentData = res;
                    this.total = res.length;
                    this.filterStudentData = res;
                    this.onePageData =tablePagination(this.studentData,this.currentPage,this.pageSize)
                }
            ).catch(
                e=> {
                    this.$message({type:'error',message:e.message})
                }
            );
            http.get({
                url: '/gl/admin/ws_and_wg_list',
                query:{
                    project_id: id
                }
            }).then((data)=>{
                let workshops= data.workshops ;
                let workgroups= data.workgroups ;
                let arr = [];   // 用来承载树结构
                let topLevel=[]; //找到树的头部


                //给树节点区分是否为羯子节点
                for(let i=0;i<workshops.length;i++){
                    workshops[i].id = workshops[i].workshop_id;
                    workshops[i].isLeaf = false;
                }
                for(let j=0;j<workgroups.length;j++){
                    workgroups[j].id = workgroups[j].workgroup_id;
                    workgroups[j].isLeaf = true;
                }


                //
                for(let i=0;i<workshops.length;i++){
                    for(let j=0;j<workgroups.length;j++){
                        if(workshops[i].path == workgroups[j].path ){
                            if( workgroups[j].children){
                                workgroups[j].children.push(workshops[i])
                            }else{
                                workgroups[j].children = [];
                                workgroups[j].children.push(workshops[i])
                            }
                        }
                    }
                }
                topLevel = workgroups.filter((ele)=>{
                    return ele.father_wg_id == null;
                });

                topLevel.map(function(ele){
                    arr.push(ele)
                });
                for(let i=0;i<workgroups.length;i++){
                    if(workgroups[i].father_wg_id != null) {
                        for(let j=0;j< arr.length;j++){
                            if (workgroups[i] .father_wg_id  == arr[j].workgroup_id ) {
                                arr[j].children.push(workgroups[i])
                            }
                        }
                    }
                }
               this.treeData = arr;

            }).catch(
                e=> {
                    this.$message({type:'error',message:e.message})
                }
            );
        },
        methods:{
            handleSizeChange(val) {
                this.pageSize = val;
                this.onePageData =tablePagination(this.filterStudentData,this.currentPage,val);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.onePageData =tablePagination(this.filterStudentData,val,this.pageSize);
            },
            formatterLesson(row){
                if(row.lessonNum){
                    return (row.lessonCount/row.lessonNum)
                }else{
                    return '0'
                }
            },
            tableRowClassName({row}){
                if(row.isTotal == true){
                    return 'tableTotal'
                }
            },
            lookWsInfo(row, column, cell, event){
                console.log(row, column, cell, event)
               if(row.isTotal){
                    return;
                }else{
                    this.$router.push({
                        path:'/StudentInfo',
                        query:{
                            wsid:row.workshop_id
                        }
                    })
                }
            },
            handleNodeClick(data){
              if(data.isLeaf){
                  //sData 挑选出符合条件的数据
                  let sData = this.studentData.filter((ele)=>{
                      return  ele.workshop_path.startsWith(data.path)
                  });
                  let leafData = {
                      workshop_name:data.name,
                      num:0,
                      login:0,
                      learn:0,
                      pass:0,
                      loginPercent:'',
                      learnPercent:'',
                      passPercent:'',
                      lessonCount:0,
                      lessonNum:0,
                      yxrzCount:0,
                      goodHwCount:0,
                      doneHdCount:0,
                      discuzCount:0,
                      isTotal:true,
                  };
                  sData.map((ele)=>{
                      leafData.num += ele.num;
                      leafData.login += ele.login;
                      leafData.learn += ele.learn;
                      leafData.pass += ele.pass;
                      leafData.lessonNum += ele.lessonNum;
                      leafData.lessonCount += ele.lessonCount;
                      leafData.yxrzCount += ele.yxrzCount;
                      leafData.goodHwCount += ele.goodHwCount;
                      leafData.doneHdCount += ele.doneHdCount;
                      leafData.discuzCount += ele.discuzCount;
                  });
                  if( leafData.num){
                      leafData.loginPercent = (100*leafData.login/leafData.num).toFixed(2) ;
                      leafData.learnPercent = (100*leafData.learn/leafData.num).toFixed(2) ;
                      leafData.passPercent = (100*leafData.pass/leafData.num).toFixed(2);
                  }
                  sData.unshift(leafData);
                  this.filterStudentData= sData;
                  this.total = sData.length;
                  this.onePageData =tablePagination(this.filterStudentData,this.currentPage,this.pageSize)
                }else{
                  let sData = this.studentData.filter((ele)=>{
                      return (ele.workshop_id == data.id);
                  });
                  this.filterStudentData= sData;
                  this.total = sData.length;
                  this.onePageData =tablePagination(this.filterStudentData,this.currentPage,this.pageSize)
                }
            },
        }
    }
</script>

<style>
 .tableTotal{
     color:#409eff!important;
     background: #f0f0f0!important;
     font-weight:bold;
 }
</style>
