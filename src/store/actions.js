import http from '../lib/http'

export default{
   fetchStudentData({state,getters,commit},options){
       http.get(options).then(
           (data)=>{
               let is_check =getters.currentProCheckStatus;
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
              commit('getStudentData',data);
           }
       )
   }
}
