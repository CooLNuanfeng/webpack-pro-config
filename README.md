# webpack4.0 配置

## 说明

1. 总入口配置 entrys.config.js


2. 目录结构

pages 文件结构,每个单页的入口文件 main.js，目录名称与 entrys.config.js 的 page 对应

```
├── index
│   ├── app.vue
│   ├── components
│   │   └── demo.vue
│   └── main.js
└── user
    ├── components
    │   └── user.vue
    └── main.js
```


3. css提取 ExtractTextPlugin 插件版本 4.0


4. **待解决** 按需加载 import() 问题
