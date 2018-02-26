<template>
    <div class="content">
        <Breadcrumb :location="location"></Breadcrumb>
        <el-row>
            <el-radio v-model="radio" label="1">male</el-radio>
            <el-radio v-model="radio" label="2">female</el-radio>
            <el-table
                    v-loading="loading"
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址">
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Breadcrumb from './Breadcrumb';
    export default {
        name: 'ProInfo',
        components:{Breadcrumb},
        data () {
            return {
                location:'项目学情统计',
                loading: false,
                radio:'1'
            }
        },
        computed:{
            ...mapGetters(['tableData']),
        }
    }
</script>
