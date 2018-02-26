<template>
    <div class="content">
        <Breadcrumb :location="location"></Breadcrumb>
        平均看课数量（个），研修日志数，优秀成果数（被推优次数），互动交流数
        <el-row>
         <h2 class="pro-desc h2">广生小学项目描述：<b>({{countTime}})</b></h2>
            <table class="ck_table">
                <tbody>
                <tr style="height: 20px;">
                    <td class="w320">学员总数</td>
                    <td class="w80 bold"> 1443</td>
                    <td class="w320">登录人数</td>
                    <td class="w80">1443</td>
                    <td class="w320">学习人数</td>
                    <td class="w80">1443</td>
                    <td class="w320">已合格人数</td>
                    <td class="w80">1443</td>
                    <td class="w320">未合格人数</td>
                    <td class="w80 bold">0</td>
                </tr>
                <tr style="height: 20px">
                    <td class="w320">参训率</td>
                    <td class="w80"> 100.00%</td>
                    <td class="w320">研修率</td>
                    <td class="w80">100.00%</td>
                    <td class="w320">合格率</td>
                    <td class="w80">100.00%</td>
                    <td class="w320">未合格率</td>
                    <td class="w80">0.00%</td>
                    <td class="w320"></td>
                    <td class="w80"></td>
                </tr>

                <tr style="height:20px">
                    <td class="w320">  平均看课数量（个）</td>
                    <td class="w80">0</td>
                    <td class="w320">研修日志数</td>
                    <td class="w80">5</td>
                    <td class="w320">优秀成果数（被推优次数）</td>
                    <td class="w80">5</td>
                    <td class="w320">互动交流数</td>
                    <td class="w80">2</td>
                    <td class="w320"></td>
                    <td class="w80"></td>
                </tr>
                <tr style="height:20px">
                    <td class="w320 ">参训学校数</td>
                    <td class="w80 bold">0</td>
                    <td class="w320">参训工作坊数</td>
                    <td class="w80 bold">2</td>
                    <td class="w320">坊主人数</td>
                    <td class="w80 bold">5</td>
                    <td class="w320"></td>
                    <td class="w80"></td>
                    <td class="w320"></td>
                    <td class="w80"></td>
                </tr>
                </tbody>
            </table>

            <div class="remind_y">
                <span class="strong">成绩说明：</span><br>
                1.采用百分制。<br>2.管理员本人的工作情况得分（满分100.0分）如下表所示:
            </div>
        </el-row>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import http from '../lib/http';
    import Breadcrumb from './Breadcrumb';
    export default {
        name: 'ProInfo',
        components:{Breadcrumb},
        data () {
            return {
                location:'项目学情统计',
                countTime:'2017-2-26 10:39:24',
                loading: false,
                radio:'1'
            }
        },
        computed:{
            ...mapGetters(['tableData']),
        },
        mounted(){
            http.get({
                url: '/gl/project/xueqing',
                query:{
                    project_id: this.$store.state.admin.current_project
                }
            }).then(
                (data)=>{
                    console.log(data)
                }
            ).catch(
                e=> this.$message(e.message)
            );
        }
    }
</script>
