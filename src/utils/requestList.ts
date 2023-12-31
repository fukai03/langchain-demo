import service from "./request";

// 请求函数封装
const requestList = {
    // 获取用户信息
    getErineBot: (params: any) => {
        return service({
            url: '/ai/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions',
            method: 'get',
            params
        })
    },
    // 测试express
    getExpress: (params: any) => {
        return service({
            url: '/express',
            method: 'get',
            params
        })
    },
    // 测试langchain
    getLangchain: (params: any) => {
        return service({
            url: '/express/langchain',
            method: 'get',
            params
        })
    },
    // 测试python服务
    getPython: (params: any) => {
        return service({
            url: '/api/persons',
            method: 'get',
            params
        })
    },
    postPython: (data: any) => {
        return service({
            url: '/api/persons',
            method: 'post',
            data
        })
    },
    // python wenxin
    getPythonWenxin: (data: any) => {
        return service({
            url: '/api/chat',
            method: 'post',
            data
        })
    }
}

export default requestList