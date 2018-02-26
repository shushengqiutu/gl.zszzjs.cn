<template>
    <div class="clearfix breadcrumb" >
        <span class="fl">当前位置&nbsp;:&nbsp;</span>
        <span class="fl">
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
    }
</script>
