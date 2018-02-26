<template>
  <div id="app">
    <el-row class="header">
      <el-col :span="4" class="xt-name">教师研修管理系统</el-col>
      <el-col :span="16" class="teacher-name">欢迎您:xxx管理员</el-col>
      <el-col :span="2" class="logout">退出</el-col>
    </el-row>
    <el-row class="tac">
        <el-col :span="5" class="fl left" style="height:100%;">
          <el-select style="width: 100%;" v-model="value" placeholder="请选择" @change="togglePro">
            <el-option
                    v-for="(item,index) in project"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
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
              <el-menu-item index="/">项目学情情况</el-menu-item>
              <el-menu-item index="/SchoolInfo">学校学情情况</el-menu-item>
              <el-menu-item index="/StudentInfo">学员学情数据分析</el-menu-item>
              <el-menu-item index="/WsInfo">工作坊学情统计</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-edit-outline"></i>
                <span>公告管理</span>
              </template>
              <el-menu-item index="/Notice">公告管理</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-edit"></i>
                <span>简报管理</span>
              </template>
              <el-menu-item index="/Briefing">简报管理</el-menu-item>
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
    export default {
        name:'app',
        data() {
            return {
                isCollapse: true,
                value:''
            };
        },
        computed: {
          project(){
              return this.$store.state.project
          }
        },
        mounted:{

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
