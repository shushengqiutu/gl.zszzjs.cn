<template>
    <div class="content">
        <Breadcrumb :location="location"></Breadcrumb>

        <el-row>
         <h2 class="pro-desc h2">{{projectInfo.project_name}}项目描述：<b>({{countTime}})</b></h2>
            <table class="ck_table">
                <tbody>
                <tr style="height: 20px;">
                    <td class="w320">学员总数</td>
                    <td class="w80 bold"> {{projectInfo.num}}</td>
                    <td class="w320">登录人数</td>
                    <td class="w80">{{projectInfo.login}}</td>
                    <td class="w320">学习人数</td>
                    <td class="w80">{{projectInfo.learn}}</td>
                    <td class="w320">已合格人数</td>
                    <td class="w80">{{projectInfo.pass}}</td>
                    <td class="w320">未合格人数</td>
                    <td class="w80 bold">{{projectInfo.num - projectInfo.pass}}</td>
                </tr>
                <tr style="height: 20px">
                    <td class="w320">参训率(%)</td>
                    <td class="w80"> {{projectInfo.loginPercent}}</td>
                    <td class="w320">研修率(%)</td>
                    <td class="w80">{{projectInfo.learnPercent}}</td>
                    <td class="w320">合格率(%)</td>
                    <td class="w80">{{projectInfo.passPercent}}</td>
                    <td class="w320">未合格率(%)</td>
                    <td class="w80">{{100-projectInfo.passPercent}}</td>
                    <td class="w320"></td>
                    <td class="w80"></td>
                </tr>

                <tr style="height:20px">
                    <td class="w320">  平均看课数量（个）</td>
                    <td class="w80">{{projectInfo.lessonCount}}</td>
                    <td class="w320">研修日志数</td>
                    <td class="w80">{{projectInfo.yxrzCount}}</td>
                    <td class="w320">优秀成果数（被推优次数）</td>
                    <td class="w80">{{projectInfo.goodHwCount}}</td>
                    <td class="w320">互动交流数</td>
                    <td class="w80">{{projectInfo.discuzCount}}</td>
                    <td class="w320"></td>
                    <td class="w80"></td>
                </tr>

                <tr style="height:20px">
                    <td class="w320 ">参训学校数</td>
                    <td class="w80 bold">{{projectInfo.employerNum}}</td>
                    <td class="w320">参训工作坊数</td>
                    <td class="w80 bold">{{projectInfo.workshopNum}}</td>
                    <td class="w320">坊主人数</td>
                    <td class="w80 bold">{{projectInfo.teacherNum}}</td>
                    <td class="w320">是否考核</td>
                    <td class="w80">{{projectInfo.checkStatus?'是':'否'}}</td>
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
                radio:'1',
                projectInfo:{},
            }
        },
        computed:{
            ...mapGetters(['tableData']),
        },
        mounted(){
            let id = this.$store.state.admin.current_project
            http.get({
                url: '/gl/project/xueqing',
                query:{
                    project_id: id
                }
            }).then(
                (data)=>{
                    this.projectInfo = data;
                }
            ).catch(
                e=> this.$message(e.message)
            );
        }
    }
</script>
