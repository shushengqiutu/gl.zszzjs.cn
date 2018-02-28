<template>
  <div id="app">
    <el-row class="header">
      <el-col :span="4" class="xt-name">教师研修管理系统</el-col>
      <el-col :span="16" class="teacher-name">欢迎您:{{adminstator}}管理员</el-col>
      <el-col :span="2" class="logout">退出</el-col>
    </el-row>
    <el-row class="tac" v-loading="loading">
        <el-col :span="5" class="fl left" style="height:100%;">
          <el-select style="width: 100%;" v-model="defaultProject" placeholder="请选择" @change="togglePro">
            <el-option
                    v-for="(item,index) in project"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
            </el-option>
          </el-select>
          <el-menu
                  :default-active="$route.path"
                  router
                  class="left-menu"
                  @open="handleOpen"
                  @close="handleClose"
                  background-color="#293846"
                  text-color="#999c9e"
                  active-text-color="#fff">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>学情统计</span>
              </template>
              <el-menu-item index="/ProInfo">学情概述</el-menu-item>
              <el-menu-item index="/SchoolInfo">学校学情统计</el-menu-item>
              <el-menu-item index="/StudentInfo">学员学情数据分析</el-menu-item>
              <el-menu-item index="/WsInfo">工作坊学情统计</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-edit-outline"></i>
                <span>公告管理</span>
              </template>
              <el-menu-item index="/Notice">项目公告管理</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-edit"></i>
                <span>简报管理</span>
              </template>
              <el-menu-item index="/Briefing">项目简报管理</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-col :span="19" class="fl right">
          <router-view/>
        </el-col>
      </el-row>
    <el-row class="footer">
      <footer></footer>
    </el-row>
  </div>
</template>


<script>
    import http from './lib/http'
    export default {
        name:'app',
        data() {
            return {
                isCollapse: true,
                defaultProject:'',
                loading:true,

            };
        },
        mounted(){
            http.get({
                url: '/gl/admin/info'
            }).then(
                (data)=>{
                    this.$store.commit('getAdminInfo',data);
                    this.defaultProject =data.current_project.toString();
                    let id = this.$store.state.admin.current_project;
                    http.get({
                        url: '/gl/project/student_xueqing',
                        query:{
                            project_id: id
                        }
                    }).then(
                        (data)=>{
                            let is_check = this.$store.getters.currentProCheckStatus;
                            if(is_check){
                                data.map(function(ele){
                                    ele.is_login =   ele.is_login?'是':'否';
                                    ele.employer = ele.employer?ele.employer:'未录入';
                                    ele.is_learn =   ele.is_learn?'是':'否';
                                    ele.is_pass =   ele.is_pass?'是':'否';
                                });
                            }else{
                                data.map(function(ele){
                                    ele.is_login =   ele.is_login?'是':'否';
                                    ele.employer = ele.employer?ele.employer:'未录入';
                                    ele.is_learn =   ele.is_learn?'是':'否';
                                    ele.is_pass =  '--';
                                    ele.getAllScore =  '--';
                                    ele.getHomeworkScore =  '--';
                                    ele.getXxhdScore =  '--';
                                    ele.getYxrzScore =  '--';
                                    ele.getZtyxScore =  '--';
                                    ele.getNetclassScore =  '--';
                                });
                            }

                            this.$store.commit('getStudentData',data);
                            this.loading = false;

                        }
                    ).catch(
                        e=> this.$message(e.message)
                    );
                }
            ).catch(
                e => {
                  this.$message("["+e.ecode+"]"+e.message)
                }
            );
        },
        computed: {
          adminstator(){
              return this.$store.state.admin.nickname;
          },
          project(){
              return this.$store.state.admin.projects;
          }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            togglePro(value){
                console.log(value)
            }
        }
    }
</script>


<style>
  @import "/assets/css/common.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin:0 auto;
  height: 100%;
}
</style>
