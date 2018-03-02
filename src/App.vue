<template>
  <div id="app" v-loading="loading">
    <el-row class="header clearfix" >
      <el-col :span="16" class="xt-name">教师研修管理系统</el-col>
      <el-col :span="2" class="teacher-name">欢迎您:{{adminstator}}管理员</el-col>
      <el-col :span="2" class="header-pro"  >
        <el-button type="text" @click="allProShow = !allProShow">切换项目</el-button>
        <div v-show="allProShow" class="header-selecetPro">
          <el-select  v-model="defaultProject" placeholder="请选择" @change="togglePro">
            <el-option
                    v-for="(item,index) in project"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="4" class="logout">退出</el-col>
    </el-row>

    <el-row class="tac clearfix">

        <el-col :span="isCollapse?1:4"  class="fl left" >
          <el-menu
                  :collapse="isCollapse"
                  :default-active="$route.path"
                  router
                  class="left-menu"
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
        <el-col :span="isCollapse?23:20" class="fl right">
          <router-view/>
        </el-col>
      </el-row>
  </div>
</template>


<script>
    import http from './lib/http'
    export default {
        name:'app',
        data() {
            return {
                defaultProject:'',
                allProShow:false,
                loading:true,
            };
        },
        mounted(){
            http.get({
                url: '/gl/admin/info'
            }).then(
                (data)=> {
                    this.$store.commit('getAdminInfo', data);
                    this.defaultProject = data.current_project.toString();
                    this.loading = false;
                }).catch(
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
          },
          isCollapse(){
              return this.$store.state.navIsCollapse;
          }
        },
        methods: {
            handleOpen(key, keyPath) {
                this.isCollapse = false;
            },
            handleClose(key, keyPath) {
                this.isCollapse = true;

            },
            togglePro(value){

                this.$store.commit('setProjectId',value);
                this.allProShow =false;

                this.$store.dispatch('fetchStudentData', {
                    url: '/gl/project/student_xueqing',
                    query: {
                        project_id: value
                    }
                }).then(()=>{
                      this.$router.push({
                          path:'/'
                      })
                    }).catch(e=>{
                    this.$message("["+e.ecode+"]"+e.message)
                })

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
