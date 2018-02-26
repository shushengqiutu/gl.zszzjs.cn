import WebTools from "../libs/WebTools"

const config = {
    apis: {
        getInfo: "/gl/admin/info",
    }
};
export default {
    getInfo(){
        const url = 'http://daijlweb.zszzjs.cn'+config.apis.getInfo ;
        return WebTools.getData( { url } )
    },
}

