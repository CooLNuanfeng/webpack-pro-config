const isMock = true;

module.exports = {
    api: '/api', //接口根路径
    proxy : isMock ? 'mock 地址': '正式地址'
}
