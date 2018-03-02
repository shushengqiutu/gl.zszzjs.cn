<template>
    <div class="clearfix breadcrumb" >
        <span class="fl" style="padding: 0 5px;position: relative;left: -10px;cursor:pointer;background:#ddd;color:#fff;">
          <el-tooltip placement="top-right"  content="显示菜单栏" >
              <i v-if="navIsCollapse" class="el-icon-d-arrow-right" @click="handleOpen"></i>
          </el-tooltip>
          <el-tooltip placement="top-right" content="收起菜单栏" >
              <i v-if="!navIsCollapse" class="el-icon-d-arrow-left" @click="handleClose"></i>
          </el-tooltip>
        </span>
        <span class="fl">当前位置&nbsp;:&nbsp;</span>
        <span class="fl" style="display: block;">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{location}}</el-breadcrumb-item>
                </el-breadcrumb>
            </span>
    </div>
</template>
<script>
    export default {
        name:'Breadcrumb',
        props:['location'],
        computed:{
            navIsCollapse(){
                return this.$store.state.navIsCollapse;
            }
        },
        methods:{
            handleOpen(){
                this.$store.commit('changeNavCollapse',false)
            } ,
            handleClose(){
                this.$store.commit('changeNavCollapse',true)
            }
        }
    }
</script>
