import WebTools from "../libs/WebTools"

const hostname = window.location.hostname;

const domains = {
    prod:"http://daijlgl.zszzjs.cn",
};
const config = {
    domain,
    apis: {
        getPlan: "/gl/admin/info",
    }
};

